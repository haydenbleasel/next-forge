import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const client: Parameters<typeof createEnv>[0]['client'] = {
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1).url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  NEXT_PUBLIC_DOCS_URL: z.string().min(1).url(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-'),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
};

export const env = createEnv({
  client,
  runtimeEnv: Object.fromEntries(
    Object.keys(client).map((key) => [key, process.env[key]])
  ),
});
