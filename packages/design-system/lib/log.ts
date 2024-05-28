import { log as logtail } from '@logtail/next';

const environment = process.env.NODE_ENV;

export const log = environment === 'production' ? logtail : console;
