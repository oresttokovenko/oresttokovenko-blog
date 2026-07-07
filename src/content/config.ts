import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    ogImage: z.string().optional(),
    wip: z.boolean().default(false),
  }),
});

export const collections = { blog };
