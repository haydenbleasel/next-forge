/* eslint-disable no-underscore-dangle */

import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import readingTime from 'reading-time';
import rehypePresetMinify from 'rehype-preset-minify';
import { extractTocHeadings } from 'pliny/mdx-plugins/remark-toc-headings.js';
import { sqip } from 'sqip';
import moonlightTheme from './public/moonlight-ii.json' with { type: 'json' };
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';
import type { Options as RehypeAutoLinkHeadingsOptions } from 'rehype-autolink-headings';
import type { ComputedFields } from 'contentlayer2/source-files';

export const computeFields = <T extends string>({
  openGraphEndpoint = '/api/og',
  imagesFolder = './public',
}: {
  openGraphEndpoint?: string;
  imagesFolder?: string;
}): ComputedFields<T> => ({
  slug: {
    type: 'string',
    description: 'The slug of the document, used in the URL',
    resolve: (page) => `/${page._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    description: 'The slug as a path segment',
    resolve: (page) => page._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'string',
    description: 'The estimated time to read the document, in minutes',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    resolve: (page) => readingTime(page.body.raw).text,
  },
  toc: {
    type: 'list',
    description: 'The table of contents of the document',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    resolve: async (page) => extractTocHeadings(page.body.raw),
  },
  image: {
    type: 'string',
    description: 'The image of the document',
    resolve: (page) => {
      if (typeof page.image === 'string') {
        return page.image;
      }

      const searchParameters = new URLSearchParams();

      if (typeof page.title === 'string') {
        searchParameters.set('title', page.title);
      }

      if (typeof page.description === 'string') {
        searchParameters.set('description', page.description);
      }

      return `${openGraphEndpoint}?${searchParameters.toString()}`;
    },
  },
  imageBlur: {
    type: 'string',
    description: 'The image data of the document',
    resolve: async (page) => {
      if (typeof page.image !== 'string') {
        return '';
      }

      const folderBase = imagesFolder.endsWith('/')
        ? imagesFolder.slice(0, -1)
        : imagesFolder;

      const blur = await sqip({
        input: `${folderBase}${page.image}`,
        plugins: [
          'sqip-plugin-primitive',
          'sqip-plugin-svgo',
          'sqip-plugin-data-uri',
        ],
      });

      const result = Array.isArray(blur) ? blur[0] : blur;

      return result.metadata.dataURIBase64;
    },
  },
});

const rehypePrettyCodeOptions: PrettyCodeOptions = {
  theme: moonlightTheme as never,
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
};

const rehypeAutolinkHeadingsOptions: RehypeAutoLinkHeadingsOptions = {
  properties: {
    className: [
      'relative',
      'lg:before:content-["#"]',
      'before:block',
      'before:absolute',
      'before:left-[-1.5rem]',
      'before:text-neutral-500',
      'focus:outline-none',
      'focus:before:text-neutral-600',
      'before:transition-colors',
    ],
    ariaLabel: 'Link to section',
  },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
  },
  computedFields: computeFields<'Blog'>({}),
}));

export const Legal = defineDocumentType(() => ({
  name: 'Legal',
  filePathPattern: `legal/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
  },
  computedFields: computeFields<'Legal'>({}),
}));

const source = makeSource({
  contentDirPath: './content',
  documentTypes: [Blog, Legal],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [rehypePrettyCode as never, rehypePrettyCodeOptions],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      rehypePresetMinify as never,
    ],
  },
});

export default source;
