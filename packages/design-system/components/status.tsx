import 'server-only';

import { cn } from '~/lib/utils';
import type { ReactElement } from 'react';

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

const betterstackApiKey = process.env.BETTERSTACK_API_KEY;
const betterstackUrl = process.env.BETTERSTACK_URL;

if (!betterstackApiKey || !betterstackUrl) {
  throw new Error(
    'Missing BETTERSTACK_API_KEY or BETTERSTACK_URL environment variable'
  );
}

export const Status = async (): Promise<ReactElement> => {
  const response = await fetch(
    'https://uptime.betterstack.com/api/v2/monitors',
    {
      headers: {
        Authorization: `Bearer ${betterstackApiKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch status');
  }

  const { data } = (await response.json()) as BetterStackResponse;

  const status =
    data.filter((monitor) => monitor.attributes.status === 'up').length /
    data.length;

  let statusColor = 'bg-green-500';
  let statusLabel = 'All systems normal';

  if (status === 0) {
    statusColor = 'bg-red-500';
    statusLabel = 'Degraded performance';
  } else if (status < 1) {
    statusColor = 'bg-yellow-500';
    statusLabel = 'Partial outage';
  }

  return (
    <a
      className="flex items-center gap-3 text-sm font-medium"
      target="_blank"
      rel="noreferrer"
      href={process.env.BETTERSTACK_URL}
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
      <span className="text-gray-500 dark:text-gray-400">{statusLabel}</span>
    </a>
  );
};
