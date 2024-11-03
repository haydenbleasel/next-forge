import 'server-only';

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  CLERK_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  CLERK_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),
  RESEND_AUDIENCE_ID: z.string().min(1),
  RESEND_FROM: z.string().min(1).email(),
  DATABASE_URL: z.string().url(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_'),
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),
  BETTERSTACK_API_KEY: z.string().min(1),
  BETTERSTACK_URL: z.string().url(),
};

export const env = createEnv({
  server,
  runtimeEnv: Object.fromEntries(
    Object.keys(server).map((key) => [key, process.env[key]])
  ),
});
