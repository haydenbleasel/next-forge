/* eslint-disable n/no-sync */
// eslint-disable-next-line import/no-nodejs-modules
import fs from 'node:fs';
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
      url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').href,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: new URL(page, process.env.NEXT_PUBLIC_SITE_URL).href,
      lastModified: new Date(),
    })),
    ...blogs.map((blog) => ({
      url: new URL(`blog/${blog}`, process.env.NEXT_PUBLIC_SITE_URL).href,
      lastModified: new Date(),
    })),
    ...legals.map((legal) => ({
      url: new URL(`legal/${legal}`, process.env.NEXT_PUBLIC_SITE_URL).href,
      lastModified: new Date(),
    })),
  ];
}
