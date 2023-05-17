import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var cachedPrisma: PrismaClient | undefined;
}

// eslint-disable-next-line @typescript-eslint/init-declarations
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const database = prisma;
