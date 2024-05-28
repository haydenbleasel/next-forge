'use client';

import * as Sentry from '@sentry/nextjs';
import { toast } from 'sonner';
import { log } from './log';

export const parseError = (error: unknown): string => {
  let message = 'An error occurred';

  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring, @typescript-eslint/prefer-destructuring
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = error.message as string;
  } else {
    message = String(error);
  }

  try {
    // eslint-disable-next-line import/namespace
    Sentry.captureException(error);
    log.error(`Parsing error: ${message}`);
  } catch (newError) {
    // eslint-disable-next-line no-console
    console.error('Error parsing error:', newError);
  }

  return message;
};

export const handleError = (error: unknown): void => {
  const message = parseError(error);

  toast.error(message);
};
