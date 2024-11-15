'use client';

import { useOthers, useSelf } from '@repo/collaboration/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';

export const Presence = () => {
  const others = useOthers();
  const self = useSelf();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="flex items-center px-4">
      {others.slice(0, 3).map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} className="h-7 w-7">
            <AvatarImage src={info?.avatar} alt={info?.name} />
            <AvatarFallback className="text-xs">
              {info?.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        );
      })}

      {hasMoreUsers && (
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary">
          +{others.length - 3}
        </div>
      )}

      {self && (
        <div className="relative ml-8 first:ml-0">
          <Avatar className="h-7 w-7">
            <AvatarImage src={self.info?.avatar} alt={self.info?.name} />
            <AvatarFallback className="text-xs">ME</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};
