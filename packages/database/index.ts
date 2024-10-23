import 'server-only';

import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';
import { fetch as undiciFetch } from 'undici';

const databaseUrl = process.env.DATABASE_URL;
const nodeEnvironment = process.env.NODE_ENV;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable.');
}

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var cachedPrisma: PrismaClient | undefined;
}

const client = new Client({ url: databaseUrl, fetch: undiciFetch });
const adapter = new PrismaPlanetScale(client);

let prisma: PrismaClient;

if (nodeEnvironment === 'production') {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachedPrisma;
}

export const database = prisma;
