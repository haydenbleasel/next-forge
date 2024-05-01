import 'server-only';

import { Analytics } from '@segment/analytics-node';

if (!process.env.SEGMENT_WRITE_KEY) {
  throw new Error('SEGMENT_WRITE_KEY is not set');
}

export const analytics = new Analytics({
  writeKey: process.env.SEGMENT_WRITE_KEY,
});
