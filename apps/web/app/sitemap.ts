// biome-ignore lint/correctness/noNodejsModules: Generates sitemap on Node.js
import fs from 'node:fs';
import { baseUrl } from '@repo/design-system/lib/consts';
import type { MetadataRoute } from 'next';

const appFolders = fs.readdirSync('app', { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith('_'))
  .filter((folder) => !folder.name.startsWith('('))
  .map((folder) => folder.name);

const blogs = fs
  .readdirSync('content/blog', { withFileTypes: true })
  .filter((file) => !file.isDirectory())
  .filter((file) => !file.name.startsWith('_'))
  .filter((file) => !file.name.startsWith('('))
  .map((file) => file.name.replace('.mdx', ''));

const legals = fs
  .readdirSync('content/legal', { withFileTypes: true })
  .filter((file) => !file.isDirectory())
  .filter((file) => !file.name.startsWith('_'))
  .filter((file) => !file.name.startsWith('('))
  .map((file) => file.name.replace('.mdx', ''));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: new URL(page, baseUrl).href,
      lastModified: new Date(),
    })),
    ...blogs.map((blog) => ({
      url: new URL(`blog/${blog}`, baseUrl).href,
      lastModified: new Date(),
    })),
    ...legals.map((legal) => ({
      url: new URL(`legal/${legal}`, baseUrl).href,
      lastModified: new Date(),
    })),
  ];
}
