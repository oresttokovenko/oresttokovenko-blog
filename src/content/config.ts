// Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// Define a schema for blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Export the collections
export const collections = {
  'blog': blogCollection,
};