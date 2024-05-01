import { log as logtail } from '@logtail/next';

const env = process.env.NODE_ENV;

export const log = env === 'production' ? logtail : console;
