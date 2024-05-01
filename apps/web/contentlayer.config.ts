/* eslint-disable no-underscore-dangle */

import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import readingTime from 'reading-time';
import rehypePresetMinify from 'rehype-preset-minify';
import { extractTocHeadings } from 'pliny/mdx-plugins/remark-toc-headings.js';
import lqip from 'lqip-modern';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';
import type { Options as RehypeAutoLinkHeadingsOptions } from 'rehype-autolink-headings';
import type { ComputedFields } from 'contentlayer/source-files';

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
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    description: 'The slug as a path segment',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'string',
    description: 'The estimated time to read the document, in minutes',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    resolve: (doc) => readingTime(doc.body.raw).text,
  },
  toc: {
    type: 'list',
    description: 'The table of contents of the document',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    resolve: async (doc) => extractTocHeadings(doc.body.raw),
  },
  image: {
    type: 'string',
    description: 'The image of the document',
    resolve: (doc) => {
      if (typeof doc.image === 'string') {
        return doc.image;
      }

      const searchParams = new URLSearchParams();

      if (typeof doc.title === 'string') {
        searchParams.set('title', doc.title);
      }

      if (typeof doc.description === 'string') {
        searchParams.set('description', doc.description);
      }

      return `${openGraphEndpoint}?${searchParams.toString()}`;
    },
  },
  imageBlur: {
    type: 'string',
    description: 'The image data of the document',
    resolve: async (doc) => {
      if (typeof doc.image !== 'string') {
        return '';
      }

      const folderBase = imagesFolder.endsWith('/')
        ? imagesFolder.slice(0, -1)
        : imagesFolder;

      const blur = await lqip(`${folderBase}${doc.image}`);

      return blur.content.toString('base64');
    },
  },
});

const rehypePrettyCodeOptions: PrettyCodeOptions = {
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
      [
        rehypePrettyCode,
        { ...rehypePrettyCodeOptions, theme: 'rose-pine-moon' },
      ],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      rehypePresetMinify as never,
    ],
  },
});

export default source;

export type { Toc } from 'pliny/mdx-plugins/remark-toc-headings';
