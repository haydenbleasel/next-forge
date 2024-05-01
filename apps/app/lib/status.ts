import 'server-only';

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

const getStatus = async (): Promise<number> => {
  if (!process.env.BETTERSTACK_API_KEY) {
    throw new Error('Missing BETTERSTACK_API_KEY environment variable');
  }

  const response = await fetch(
    'https://uptime.betterstack.com/api/v2/monitors',
    {
      headers: {
        Authorization: `Bearer ${process.env.BETTERSTACK_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch status');
  }

  const { data } = (await response.json()) as BetterStackResponse;

  return (
    data.filter((monitor) => monitor.attributes.status === 'up').length /
    data.length
  );
};

export default getStatus;
