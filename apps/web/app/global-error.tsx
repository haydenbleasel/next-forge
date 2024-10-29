'use client';

import { Button } from '@repo/design-system/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import type Error from 'next/error';
import { useEffect } from 'react';

type GlobalErrorProperties = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  useEffect(() => {
    // eslint-disable-next-line import/namespace
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h1>Oops, something went wrong</h1>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
};

export default GlobalError;
