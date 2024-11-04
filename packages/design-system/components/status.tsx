import 'server-only';
import { env } from '@repo/env';
import type { ReactElement } from 'react';
import { cn } from '../lib/utils';

type BetterStackResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      url: string;
      pronounceable_name: string;
      auth_username: string;
      auth_password: string;
      monitor_type: string;
      monitor_group_id: unknown;
      last_checked_at: string;
      status:
        | 'down'
        | 'maintenance'
        | 'paused'
        | 'pending'
        | 'up'
        | 'validating';
      policy_id: unknown;
      required_keyword: unknown;
      verify_ssl: boolean;
      check_frequency: number;
      call: boolean;
      sms: boolean;
      email: boolean;
      push: boolean;
      team_wait: unknown;
      http_method: string;
      request_timeout: number;
      recovery_period: number;
      request_headers: unknown[];
      request_body: string;
      follow_redirects: boolean;
      remember_cookies: boolean;
      created_at: string;
      updated_at: string;
      ssl_expiration: unknown;
      domain_expiration: unknown;
      regions: string[];
      expected_status_codes: unknown[];
      port: unknown;
      confirmation_period: number;
      paused_at: unknown;
      paused: boolean;
      maintenance_from: unknown;
      maintenance_to: unknown;
      maintenance_timezone: string;
    };
    relationships: {
      policy: {
        data: unknown;
      };
    };
  }[];
  pagination: {
    first: string;
    last: string;
    prev: unknown;
    next: unknown;
  };
};

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
      <span className="text-muted-foreground">{statusLabel}</span>
    </a>
  );
};
