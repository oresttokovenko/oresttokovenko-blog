import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Define a schema for blog posts using Content Layer API
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    wip: z.boolean().optional(),
  }),
});

// Export the collections
export const collections = { blog };
