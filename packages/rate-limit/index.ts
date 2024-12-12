import { env } from '@repo/env';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});
