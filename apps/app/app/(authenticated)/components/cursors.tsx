'use client';

import { useMyPresence, useOthers } from '@repo/collaboration/hooks';
import { tailwind } from '@repo/tailwind-config';
import { useEffect } from 'react';

const Cursor = ({
  color,
  x,
  y,
}: {
  color: string;
  x: number;
  y: number;
}) => (
  <svg
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      transform: `translateX(${x}px) translateY(${y}px)`,
    }}
    className="transition-transform duration-100"
    width="24"
    height="36"
    viewBox="0 0 24 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Cursor</title>
    <path
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      fill={color}
    />
  </svg>
);

const COLORS = [
  tailwind.theme.colors.red[500],
  tailwind.theme.colors.blue[500],
  tailwind.theme.colors.green[500],
  tailwind.theme.colors.yellow[500],
  tailwind.theme.colors.purple[500],
];

export const Cursors = () => {
  /**
   * useMyPresence returns the presence of the current user and a function to update it.
   * updateMyPresence is different than the setState function returned by the useState hook from React.
   * You don't need to pass the full presence object to update it.
   * See https://liveblocks.io/docs/api-reference/liveblocks-react#useMyPresence for more information
   */
  const [_cursor, updateMyPresence] = useMyPresence();

  /**
   * Return all the other users in the room and their presence (a cursor position in this case)
   */
  const others = useOthers();

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      // Update the user cursor position on every pointer move
      updateMyPresence({
        cursor: {
          x: Math.round(event.clientX),
          y: Math.round(event.clientY),
        },
      });
    };

    const onPointerLeave = () => {
      // When the pointer goes out, set cursor to null
      updateMyPresence({
        cursor: null,
      });
    };

    document.body.addEventListener('pointermove', onPointerMove);
    document.body.addEventListener('pointerleave', onPointerLeave);

    return () => {
      document.body.removeEventListener('pointermove', onPointerMove);
      document.body.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [updateMyPresence]);

  return others.map(({ connectionId, presence }) => {
    if (!presence.cursor) {
      return null;
    }

    return (
      <Cursor
        key={`cursor-${connectionId}`}
        // connectionId is an integer that is incremented at every new connections
        // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
        color={COLORS[connectionId % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
      />
    );
  });
};
