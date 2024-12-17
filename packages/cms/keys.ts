import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      BASEHUB_TOKEN: z.string().min(1).startsWith('bshb_pk_'),
    },
    runtimeEnv: {
      BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    },
  });
