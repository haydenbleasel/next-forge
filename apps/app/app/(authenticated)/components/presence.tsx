'use client';

import { useOthers } from '@repo/collaboration/hooks';

export const Presence = () => {
  const others = useOthers();
  const userCount = others.length;
  return <div>There are {userCount} other user(s) online</div>;
};
