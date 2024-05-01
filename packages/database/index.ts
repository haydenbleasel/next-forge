import 'server-only';

import { PrismaClient } from '@prisma/client';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { Client } from '@planetscale/database';

const databaseUrl = process.env.DATABASE_URL;
const nodeEnv = process.env.NODE_ENV;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable.')
}

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var cachedPrisma: PrismaClient | undefined;
}

const client = new Client({ url: databaseUrl });
const adapter = new PrismaPlanetScale(client);

// eslint-disable-next-line @typescript-eslint/init-declarations
let prisma: PrismaClient;

if (nodeEnv === 'production') {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachedPrisma;
}

export const database = prisma;
