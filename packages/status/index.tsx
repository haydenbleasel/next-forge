import 'server-only';
import { env } from '@repo/env';
import type { ReactElement } from 'react';
import type { BetterStackResponse } from './types';

export const Status = async (): Promise<ReactElement> => {
  const response = await fetch(
    'https://uptime.betterstack.com/api/v2/monitors',
    {
      headers: {
        Authorization: `Bearer ${env.BETTERSTACK_API_KEY}`,
      },
    }
  );

  let statusColor = 'bg-success';
  let statusLabel = 'All systems normal';

  if (response.ok) {
    const { data } = (await response.json()) as BetterStackResponse;

    const status =
      data.filter((monitor) => monitor.attributes.status === 'up').length /
      data.length;

    if (status === 0) {
      statusColor = 'bg-destructive';
      statusLabel = 'Degraded performance';
    } else if (status < 1) {
      statusColor = 'bg-warning';
      statusLabel = 'Partial outage';
    }
  } else {
    statusColor = 'bg-muted-foreground';
    statusLabel = 'Unable to fetch status';
  }

  return (
    <a
      className="flex items-center gap-3 font-medium text-sm"
      target="_blank"
      rel="noreferrer"
      href={env.BETTERSTACK_URL}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColor}`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${statusColor}`}
        />
      </span>
      <span className="text-muted-foreground">{statusLabel}</span>
    </a>
  );
};
