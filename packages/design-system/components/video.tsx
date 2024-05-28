'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '~/lib/utils';
import type { FC } from 'react';
import type { ReactPlayerProps } from 'react-player';

const Placeholder: FC<{ readonly className?: string }> = ({ className }) => (
  <div
    className={cn(
      'pointer-events-none relative z-10 flex h-full w-full select-none items-center justify-center bg-gray-100 transition-opacity dark:bg-gray-900',
      className
    )}
  >
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-foreground"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);

const Player = dynamic<ReactPlayerProps>(
  async () => {
    const player = await import(
      /* webpackChunkName: 'player' */
      'react-player/lazy'
    );

    return player.default;
  },
  {
    ssr: false,
    loading: () => <Placeholder />,
  }
);

type VideoProperties = ReactPlayerProps & {
  readonly className?: string;
};

export const Video: FC<VideoProperties> = ({
  className,
  style,
  width,
  height,
  onReady,
  ...properties
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded select-none',
        className,
        !className?.includes('aspect-') && 'aspect-video'
      )}
      style={style}
    >
      <Placeholder className={loaded ? 'opacity-0' : 'opacity-100'} />
      <Player
        style={{
          position: 'absolute',
          inset: 0,
        }}
        width={width ?? '100%'}
        height={height ?? '100%'}
        onReady={(player) => {
          setLoaded(true);
          onReady?.(player);
        }}
        {...properties}
      />
    </div>
  );
};
