import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';
import { sqip } from 'sqip';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'catppuccin-mocha',
    dark: 'catppuccin-mocha',
  },
};

const posts = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '**/*.md',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
      })
    );

    const blur = await context.cache(page._meta.path, async () =>
      sqip({
        input: `./public/blog/${page.image}`,
        plugins: [
          'sqip-plugin-primitive',
          'sqip-plugin-svgo',
          'sqip-plugin-data-uri',
        ],
      })
    );

    const result = Array.isArray(blur) ? blur[0] : blur;

    return {
      ...page,
      body,
      date: new Date(page.date),
      slug: page._meta.path,
      readingTime: readingTime(page.content).text,
      image: `/blog/${page.image}`,
      imageBlur: result.metadata.dataURIBase64 as string,
    };
  },
});

const legals = defineCollection({
  name: 'legal',
  directory: 'content/legal',
  include: '**/*.md',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [remarkHeading],
      })
    );

    return {
      ...page,
      body,
      updated: new Date(page.updated),
      slug: page._meta.path,
      readingTime: readingTime(page.content).text,
    };
  },
});

export default defineConfig({
  collections: [posts, legals],
});
