import { keys } from './keys';
import { init } from '@sentry/nextjs';

const opts = {
  dsn: keys().NEXT_PUBLIC_SENTRY_DSN,
};

export const initializeSentry = () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    init(opts);
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    init(opts);
  }
};
