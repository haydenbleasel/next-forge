import getStatus from '@/lib/status';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import type { ReactElement } from 'react';

const Status = async (): Promise<ReactElement> => {
  const status = await getStatus();

  let statusColor = 'bg-green-500';
  let statusLabel = 'All systems nominal';

  if (status === 0) {
    statusColor = 'bg-red-500';
    statusLabel = 'Degraded performance';
  } else if (status < 1) {
    statusColor = 'bg-yellow-500';
    statusLabel = 'Partial outage';
  }

  return (
    <Button variant="outline" asChild>
      <a
        className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 outline-none"
        target="_blank"
        rel="noreferrer"
        href="https://status.beskar.co/"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              statusColor
            )}
          />
          <span
            className={cn(
              'relative inline-flex h-2 w-2 rounded-full',
              statusColor
            )}
          />
        </span>
        <span>{statusLabel}</span>
      </a>
    </Button>
  );
};

export default Status;
