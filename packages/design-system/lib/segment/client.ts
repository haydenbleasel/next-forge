'use client';

import { AnalyticsBrowser } from '@segment/analytics-next';
import { baseUrl } from '../consts';

if (!process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY) {
  throw new Error('NEXT_PUBLIC_SEGMENT_WRITE_KEY is not set');
}

const cdnUrl = new URL('/segment-cdn', baseUrl);
const apiHost = new URL('/segment-api', baseUrl);

export const analytics = AnalyticsBrowser.load(
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
