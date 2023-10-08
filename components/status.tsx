import { twMerge } from 'tailwind-merge';
import getStatus from '@/lib/status';
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
    <a
      className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 outline-none"
      target="_blank"
      rel="noreferrer"
      href="https://status.beskar.co/"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={twMerge(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
            statusColor
          )}
        />
        <span
          className={twMerge(
            'relative inline-flex h-2 w-2 rounded-full',
            statusColor
          )}
        />
      </span>
      <span className="text-sm text-white/50 transition-colors hover:text-white">
        {statusLabel}
      </span>
    </a>
  );
};

export default Status;
