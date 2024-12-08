// biome-ignore lint/correctness/noNodejsModules: Generates sitemap on Node.js
import fs from 'node:fs';
import { blog, legal } from '@repo/cms';
import { env } from '@repo/env';
import type { MetadataRoute } from 'next';

const appFolders = fs.readdirSync('app', { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith('_'))
  .filter((folder) => !folder.name.startsWith('('))
  .map((folder) => folder.name);

const blogs = (await blog.getPosts()).map((post) => post._slug);

const legals = (await legal.getPosts()).map((post) => post._slug);

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
  {
    url: env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    lastModified: new Date(),
  },
  ...pages.map((page) => ({
    url: new URL(page, env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL).href,
    lastModified: new Date(),
  })),
  ...blogs.map((blog) => ({
    url: new URL(`blog/${blog}`, env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
      .href,
    lastModified: new Date(),
  })),
  ...legals.map((legal) => ({
    url: new URL(
      `legal/${legal}`,
      env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ).href,
    lastModified: new Date(),
  })),
];

export default sitemap;
