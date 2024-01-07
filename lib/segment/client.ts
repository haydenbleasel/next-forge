'use client';

import { useUser } from '@clerk/nextjs';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { useEffect } from 'react';

if (!process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY) {
  throw new Error('NEXT_PUBLIC_SEGMENT_WRITE_KEY is not set');
}

const cdnUrl = new URL('/segment-cdn', process.env.NEXT_PUBLIC_SITE_URL);
const apiHost = new URL('/segment-api', process.env.NEXT_PUBLIC_SITE_URL);

export const { identify, ...analytics } = AnalyticsBrowser.load(
  {
    writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    cdnURL: process.env.NODE_ENV === 'production' ? cdnUrl.href : undefined,
  },
  process.env.NODE_ENV === 'production'
    ? {
        integrations: {
          'Segment.io': {
            apiHost: `${apiHost.href.replace(apiHost.protocol, '')}/v1`,
            protocol: apiHost.protocol.slice(0, -1),
          },
        },
      }
    : undefined
);

export const useAnalytics = (): Omit<typeof analytics, 'identify'> => {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    identify(user.id, {
      username: user.username,
      email: user.emailAddresses.at(0)?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.fullName,
      phone: user.phoneNumbers.at(0)?.phoneNumber,
      // eslint-disable-next-line no-console, promise/prefer-await-to-then
    }).catch(console.warn);
  }, [user]);

  return analytics;
};
