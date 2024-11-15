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
};

export const Room = ({ id, children, authEndpoint }: RoomProps) => (
  <LiveblocksProvider authEndpoint={authEndpoint}>
    <RoomProvider id={id}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
