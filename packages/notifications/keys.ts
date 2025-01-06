import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      KNOCK_API_KEY: z.string().min(1).optional(),
      KNOCK_FEED_CHANNEL_ID: z.string().min(1).optional(),
      KNOCK_SECRET_API_KEY: z.string().min(1).optional(),
    },
    runtimeEnv: {
      KNOCK_API_KEY: process.env.KNOCK_API_KEY,
      KNOCK_FEED_CHANNEL_ID: process.env.KNOCK_FEED_CHANNEL_ID,
      KNOCK_SECRET_API_KEY: process.env.KNOCK_SECRET_API_KEY,
    },
  });
