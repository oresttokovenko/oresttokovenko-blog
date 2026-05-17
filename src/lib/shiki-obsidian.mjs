/**
 * Shiki transformer that wraps Obsidian-flavored markdown patterns in styled spans.
 * Only applies to ```markdown fenced blocks.
 *
 * Patterns:
 *   ![[embed]]    → <span class="ob-embed">
 *   [[wikilink]]  → <span class="ob-wikilink">
 *   ^[footnote]   → <span class="ob-footnote">
 */

const bodyPatterns = [
  { regex: /!\[\[[^\]\n]+\]\]/g, className: "ob-embed" },
  { regex: /(?<!!)\[\[[^\]\n]+\]\]/g, className: "ob-wikilink" },
  { regex: /\^\[[^\]\n]+\]/g, className: "ob-footnote" },
];

const yamlKeyPattern = {
  regex: /(?<=^[ \t]*(?:-[ \t]+)?)[a-zA-Z_][a-zA-Z0-9_-]*(?=:)/g,
  className: "ob-yaml-key",
};

const frontmatterPatterns = [yamlKeyPattern, ...bodyPatterns];

function gatherText(node) {
  if (node.type === "text") return node.value ?? "";
  if (!node.children) return "";
  let s = "";
  for (const c of node.children) s += gatherText(c);
  return s;
}

export function transformerObsidian() {
  return {
    name: "obsidian",
    code(node) {
      if (this.options.lang !== "markdown") return;
      if (!node.children) return;

      // Track YAML frontmatter state: "before" → "in" → "after"
      let fmState = "before";

      for (const line of node.children) {
        if (line.type !== "element") continue;
        const fullText = gatherText(line);
        if (!fullText) continue;

        // Frontmatter delimiter handling (don't process the --- line itself)
        if (fullText.trim() === "---") {
          if (fmState === "before") fmState = "in";
          else if (fmState === "in") fmState = "after";
          continue;
        }

        const activePatterns =
          fmState === "in" ? frontmatterPatterns : bodyPatterns;

        const matches = [];
        for (const { regex, className } of activePatterns) {
          regex.lastIndex = 0;
          let m;
          while ((m = regex.exec(fullText))) {
            matches.push({
              start: m.index,
              end: m.index + m[0].length,
              className,
            });
          }
        }
        if (matches.length === 0) continue;
        matches.sort((a, b) => a.start - b.start);

        // drop overlapping (keep earliest)
        const filtered = [];
        let lastEnd = -1;
        for (const m of matches) {
          if (m.start >= lastEnd) {
            filtered.push(m);
            lastEnd = m.end;
          }
        }

        // collect segments with their inline style, preserving original Shiki coloring
        const segs = [];
        function walk(n, style) {
          if (n.type === "text") {
            segs.push({ text: n.value, style });
          } else if (n.type === "element") {
            const s = n.properties?.style ?? style;
            for (const c of n.children || []) walk(c, s);
          }
        }
        for (const c of line.children) walk(c, undefined);

        // build segment offsets
        let offset = 0;
        const segRanges = segs.map((s) => {
          const r = { ...s, start: offset, end: offset + s.text.length };
          offset += s.text.length;
          return r;
        });

        const newChildren = [];

        function emitOutside(rangeStart, rangeEnd) {
          if (rangeStart >= rangeEnd) return;
          for (const sr of segRanges) {
            const segStart = Math.max(sr.start, rangeStart);
            const segEnd = Math.min(sr.end, rangeEnd);
            if (segStart >= segEnd) continue;
            const txt = fullText.slice(segStart, segEnd);
            if (sr.style) {
              newChildren.push({
                type: "element",
                tagName: "span",
                properties: { style: sr.style },
                children: [{ type: "text", value: txt }],
              });
            } else {
              newChildren.push({ type: "text", value: txt });
            }
          }
        }

        function emitMatch(match) {
          newChildren.push({
            type: "element",
            tagName: "span",
            properties: { class: match.className },
            children: [
              { type: "text", value: fullText.slice(match.start, match.end) },
            ],
          });
        }

        let cursor = 0;
        for (const m of filtered) {
          if (cursor < m.start) emitOutside(cursor, m.start);
          emitMatch(m);
          cursor = m.end;
        }
        if (cursor < fullText.length) emitOutside(cursor, fullText.length);

        line.children = newChildren;
      }
    },
  };
}
