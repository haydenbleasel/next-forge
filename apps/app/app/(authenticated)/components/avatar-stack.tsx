'use client';

import { useOthers, useSelf } from '@repo/collaboration/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';

const PresenceAvatar = ({
  info,
}: {
  // biome-ignore lint/correctness/noUndeclaredVariables: Liveblocks is global
  info?: Liveblocks['UserMeta']['info'];
}) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <Avatar className="h-7 w-7 bg-secondary ring-1 ring-background">
          <AvatarImage src={info?.avatar} alt={info?.name} />
          <AvatarFallback className="text-xs">
            {info?.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent collisionPadding={4}>
        <p>{info?.name ?? 'Unknown'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const AvatarStack = () => {
  const others = useOthers();
  const self = useSelf();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="flex items-center px-4 -space-x-1">
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
