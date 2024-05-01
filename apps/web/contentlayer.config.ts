import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import {
  computeFields,
  remarkPlugins,
  rehypePlugins,
} from 'contentlayer-datapad';

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
    remarkPlugins: remarkPlugins(),
    rehypePlugins: rehypePlugins({
      theme: 'rose-pine-moon',
    }),
  },
});

export default source;
