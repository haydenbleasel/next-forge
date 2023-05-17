/* eslint-disable n/no-sync */
// eslint-disable-next-line import/no-nodejs-modules
import fs from 'node:fs';
import type { MetadataRoute } from 'next';

const appFolders = fs.readdirSync('app', { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .map((folder) => folder.name);

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
  ];
}
