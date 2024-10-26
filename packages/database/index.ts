import 'server-only';

import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

const databaseUrl = process.env.DATABASE_URL;

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

export const database = new PrismaClient({ adapter });
