import { useEffect, useRef, useState } from "react";

type Category =
  | "project"
  | "person"
  | "service"
  | "repo"
  | "concept"
  | "meeting"
  | "design";

interface NodeData {
  id: string;
  category: Category;
  degree: number;
}

interface LinkData {
  source: string;
  target: string;
}

const ACCENT = "#2218d6";
const PARCHMENT = "rgb(245, 241, 233)";
const BORDER = "rgb(220, 214, 200)";

const nodes: NodeData[] = [
  { id: "pricing-revamp", category: "project", degree: 9 },
  { id: "data-platform-migration", category: "project", degree: 4 },
  { id: "customer-portal-v2", category: "project", degree: 3 },
  { id: "sarah-chen", category: "person", degree: 7 },
  { id: "marcus-lee", category: "person", degree: 6 },
  { id: "priya-shah", category: "person", degree: 3 },
  { id: "billing-svc", category: "service", degree: 10 },
  { id: "auth-api", category: "service", degree: 5 },
  { id: "analytics-pipeline", category: "service", degree: 5 },
  { id: "monorepo-frontend", category: "repo", degree: 3 },
  { id: "infra-terraform", category: "repo", degree: 2 },
  { id: "adr-024-postgres-17", category: "concept", degree: 6 },
  { id: "slo-budget", category: "concept", degree: 4 },
  { id: "runbook-oncall", category: "concept", degree: 6 },
  { id: "2026-04-01-pricing-revamp-sync", category: "meeting", degree: 4 },
  { id: "2026-04-08-pricing-revamp-sync", category: "meeting", degree: 5 },
  { id: "2026-04-15-pricing-revamp-sync", category: "meeting", degree: 4 },
  { id: "pricing-revamp-design", category: "design", degree: 5 },
  { id: "billing-svc-design", category: "design", degree: 5 },
];

const links: LinkData[] = [
  { source: "pricing-revamp", target: "sarah-chen" },
  { source: "pricing-revamp", target: "marcus-lee" },
  { source: "pricing-revamp", target: "billing-svc" },
  { source: "pricing-revamp", target: "monorepo-frontend" },
  { source: "pricing-revamp", target: "adr-024-postgres-17" },
  { source: "data-platform-migration", target: "adr-024-postgres-17" },
  { source: "data-platform-migration", target: "infra-terraform" },
  { source: "data-platform-migration", target: "analytics-pipeline" },
  { source: "data-platform-migration", target: "sarah-chen" },
  { source: "customer-portal-v2", target: "priya-shah" },
  { source: "customer-portal-v2", target: "monorepo-frontend" },
  { source: "customer-portal-v2", target: "billing-svc" },
  { source: "billing-svc", target: "auth-api" },
  { source: "billing-svc", target: "slo-budget" },
  { source: "billing-svc", target: "runbook-oncall" },
  { source: "billing-svc", target: "adr-024-postgres-17" },
  { source: "auth-api", target: "slo-budget" },
  { source: "auth-api", target: "runbook-oncall" },
  { source: "analytics-pipeline", target: "billing-svc" },
  { source: "analytics-pipeline", target: "slo-budget" },
  { source: "analytics-pipeline", target: "runbook-oncall" },
  { source: "analytics-pipeline", target: "infra-terraform" },
  { source: "monorepo-frontend", target: "auth-api" },
  { source: "sarah-chen", target: "runbook-oncall" },
  { source: "marcus-lee", target: "runbook-oncall" },
  { source: "priya-shah", target: "runbook-oncall" },
  { source: "2026-04-01-pricing-revamp-sync", target: "pricing-revamp" },
  { source: "2026-04-01-pricing-revamp-sync", target: "sarah-chen" },
  { source: "2026-04-01-pricing-revamp-sync", target: "marcus-lee" },
  { source: "2026-04-01-pricing-revamp-sync", target: "pricing-revamp-design" },
  { source: "2026-04-08-pricing-revamp-sync", target: "pricing-revamp" },
  { source: "2026-04-08-pricing-revamp-sync", target: "sarah-chen" },
  { source: "2026-04-08-pricing-revamp-sync", target: "marcus-lee" },
  { source: "2026-04-08-pricing-revamp-sync", target: "priya-shah" },
  { source: "2026-04-08-pricing-revamp-sync", target: "billing-svc" },
  { source: "2026-04-15-pricing-revamp-sync", target: "pricing-revamp" },
  { source: "2026-04-15-pricing-revamp-sync", target: "sarah-chen" },
  { source: "2026-04-15-pricing-revamp-sync", target: "marcus-lee" },
  { source: "2026-04-15-pricing-revamp-sync", target: "adr-024-postgres-17" },
  { source: "pricing-revamp-design", target: "pricing-revamp" },
  { source: "pricing-revamp-design", target: "sarah-chen" },
  { source: "pricing-revamp-design", target: "adr-024-postgres-17" },
  { source: "pricing-revamp-design", target: "billing-svc" },
  { source: "billing-svc-design", target: "billing-svc" },
  { source: "billing-svc-design", target: "auth-api" },
  { source: "billing-svc-design", target: "marcus-lee" },
  { source: "billing-svc-design", target: "adr-024-postgres-17" },
  { source: "billing-svc-design", target: "slo-budget" },
];

export default function WikiGraph() {
  const [ForceGraph, setForceGraph] = useState<React.ComponentType<any> | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const hasFitRef = useRef(false);
  const [size, setSize] = useState({ width: 600, height: 520 });

  useEffect(() => {
    let mounted = true;
    import("react-force-graph-2d")
      .then((mod) => {
        if (mounted) setForceGraph(() => mod.default);
      })
      .catch((err) => console.error("WikiGraph: failed to load", err));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSize({ width: el.offsetWidth, height: 520 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const graphData = { nodes, links };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: 520,
        backgroundColor: PARCHMENT,
        boxShadow: `0 0 0 1px ${BORDER}`,
        borderRadius: "0.75rem",
        overflow: "hidden",
        margin: "1.5rem 0",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      {!ForceGraph ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "rgb(120, 110, 90)",
            fontSize: "0.875rem",
          }}
        >
          Loading graph…
        </div>
      ) : (
        <ForceGraph
          ref={graphRef}
          graphData={graphData}
          width={size.width}
          height={size.height}
          backgroundColor={PARCHMENT}
          linkColor={() => "rgba(34, 24, 214, 0.35)"}
          linkWidth={0.6}
          nodeLabel={(n: NodeData) => n.id}
          warmupTicks={80}
          cooldownTicks={60}
          d3VelocityDecay={0.35}
          onEngineStop={() => {
            if (!hasFitRef.current && graphRef.current) {
              graphRef.current.zoomToFit(400, 40);
              hasFitRef.current = true;
            }
          }}
          nodeCanvasObject={(
            node: NodeData & { x: number; y: number },
            ctx: CanvasRenderingContext2D,
            globalScale: number,
          ) => {
            // All sizes in target pixels, then divided by globalScale to stay screen-constant.
            const pxRadius = Math.sqrt(node.degree) * 1.6;
            const radius = pxRadius / globalScale;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            if (node.category === "person") {
              ctx.strokeStyle = ACCENT;
              ctx.lineWidth = 1.4 / globalScale;
              ctx.stroke();
            } else {
              ctx.fillStyle = ACCENT;
              ctx.fill();
            }
            const fontSize = 11 / globalScale;
            ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = ACCENT;
            ctx.fillText(node.id, node.x, node.y + radius + 3 / globalScale);
          }}
          nodePointerAreaPaint={(
            node: NodeData & { x: number; y: number },
            color: string,
            ctx: CanvasRenderingContext2D,
            globalScale: number,
          ) => {
            ctx.fillStyle = color;
            const radius = (Math.sqrt(node.degree) * 1.6 + 3) / globalScale;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fill();
          }}
        />
      )}
    </div>
  );
}
