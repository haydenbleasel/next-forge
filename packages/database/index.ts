import 'server-only';

import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

const databaseUrl = process.env.DATABASE_URL;
const nodeEnvironment = process.env.NODE_ENV;

neonConfig.webSocketConstructor = ws;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable.');
}

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var cachedPrisma: PrismaClient | undefined;
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaNeon(pool);

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
