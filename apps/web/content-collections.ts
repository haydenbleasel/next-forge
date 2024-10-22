import { defineCollection, defineConfig } from '@content-collections/core';

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
  }),
});

const legal = defineCollection({
  name: 'legal',
  directory: 'content/legal',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

export default defineConfig({
  collections: [posts, legal],
});
