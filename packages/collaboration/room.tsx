'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import type { ReactNode } from 'react';

type RoomProps = {
  id: string;
  children: ReactNode;
  authEndpoint: string;
  fallback: ReactNode;
};

export const Room = ({ id, children, authEndpoint, fallback }: RoomProps) => (
  <LiveblocksProvider authEndpoint={authEndpoint}>
    <RoomProvider id={id}>
      <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
