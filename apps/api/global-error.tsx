'use client';

import { captureException } from '@sentry/nextjs';
import type NextError from 'next/error';
import { useEffect } from 'react';
import type { FC } from 'react';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError: FC<GlobalErrorProperties> = ({ error }) => {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h1>Oops, something went wrong</h1>
      </body>
    </html>
  );
};

export default GlobalError;
