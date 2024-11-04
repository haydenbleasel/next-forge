import { log as logtail } from '@logtail/next';
import { env } from '@repo/env';

export const log = env.NODE_ENV === 'production' ? logtail : console;
