import { KnockFeedProvider, KnockProvider } from '@knocklabs/react';
import type { ReactNode } from 'react';

const knockApiKey = process.env.KNOCK_API_KEY;
const knockFeedChannelId = process.env.KNOCK_FEED_CHANNEL_ID;

if (!knockApiKey) {
  throw new Error('KNOCK_API_KEY is not set');
}

if (!knockFeedChannelId) {
  throw new Error('KNOCK_FEED_CHANNEL_ID is not set');
}

export const NotificationsProvider = ({
  children,
  userId,
}: { children: ReactNode; userId: string }) => (
  <KnockProvider apiKey={knockApiKey} userId={userId}>
    <KnockFeedProvider feedId={knockFeedChannelId}>
      {children}
    </KnockFeedProvider>
  </KnockProvider>
);
