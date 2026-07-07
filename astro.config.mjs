// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import { typst } from "astro-typst";

import { transformerObsidian } from "./src/lib/shiki-obsidian.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://oresttokovenko.com",
  compressHTML: true,
  integrations: [
    mdx(),
    react(),
    sitemap(),
    typst({
      fontArgs: [{ fontPaths: ["src/assets/fonts"] }],
    }),
  ],

  markdown: {
    shikiConfig: {
      transformers: [transformerObsidian()],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["@myriaddreamin/typst-ts-node-compiler"],
    },
  },
});
