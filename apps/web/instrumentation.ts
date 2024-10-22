import { init } from '@sentry/nextjs';

export const register = () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    });
  }
};
