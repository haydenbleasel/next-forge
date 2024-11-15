'use client';

import { useOthers, useSelf } from '@repo/collaboration/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';

const PresenceAvatar = ({
  info,
}: {
  info?: {
    name?: string;
    avatar?: string;
  };
}) => {
  return (
    <Avatar className="h-7 w-7 bg-secondary">
      <AvatarImage src={info?.avatar} alt={info?.name} />
      <AvatarFallback className="text-xs">
        {info?.name?.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};

export const Presence = () => {
  const others = useOthers();
  const self = useSelf();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="flex items-center px-4">
      {others.slice(0, 3).map(({ connectionId, info }) => (
        <PresenceAvatar key={connectionId} info={info} />
      ))}

      {hasMoreUsers && (
        <PresenceAvatar info={{ name: `+${others.length - 3}` }} />
      )}

      {self && <PresenceAvatar info={self.info} />}
    </div>
  );
};
