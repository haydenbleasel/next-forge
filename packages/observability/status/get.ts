import { env } from '@repo/env';
import type { BetterStackResponse } from './types';

export const getStatus = async () => {
  const response = await fetch(
    'https://uptime.betterstack.com/api/v2/monitors',
    {
      headers: {
        Authorization: `Bearer ${env.BETTERSTACK_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch status');
  }

  const { data } = (await response.json()) as BetterStackResponse;

  return data;
};
