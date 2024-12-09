import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const core = () =>
  createEnv({
    client: {
      NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
      NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
      NEXT_PUBLIC_API_URL: z.string().min(1).url().optional(),
      NEXT_PUBLIC_DOCS_URL: z.string().min(1).url().optional(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    },
  });
