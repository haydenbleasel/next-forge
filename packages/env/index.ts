import { keys as ai } from '@repo/ai/keys';
import { keys as analytics } from '@repo/analytics/keys';
import { keys as auth } from '@repo/auth/keys';
import { keys as cms } from '@repo/cms/keys';
import { keys as collaboration } from '@repo/collaboration/keys';
import { keys as database } from '@repo/database/keys';
import { keys as email } from '@repo/email/keys';
import { keys as flags } from '@repo/feature-flags/keys';
import { keys as observability } from '@repo/observability/keys';
import { keys as payments } from '@repo/payments/keys';
import { keys as security } from '@repo/security/keys';
import { keys as webhooks } from '@repo/webhooks/keys';
import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { core } from './core';

const server: Parameters<typeof createEnv>[0]['server'] = {
  ANALYZE: z.string().optional(),

  OPENAI_API_KEY: z.string().min(1).startsWith('sk-').optional(),
  BASEHUB_TOKEN: z.string().min(1).startsWith('bshb_pk_'),
  UPSTASH_REDIS_REST_URL: z.string().min(1).url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Added by Sentry Integration, Vercel Marketplace
  SENTRY_ORG: z.string().min(1).optional(),
  SENTRY_PROJECT: z.string().min(1).optional(),

  // Added by Vercel
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
};

export const env = createEnv({
  extends: [
    core(),
    vercel(),
    auth(),
    ai(),
    analytics(),
    cms(),
    collaboration(),
    database(),
    email(),
    flags(),
    observability(),
    payments(),
    security(),
    webhooks(),
  ],
  server,
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
});
