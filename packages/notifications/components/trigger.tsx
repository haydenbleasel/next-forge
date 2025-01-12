'use client';

import { NotificationFeedPopover } from '@knocklabs/react';
import { useRef, useState } from 'react';
import type { ReactElement, RefObject } from 'react';
import { keys } from '../keys';

// Required CSS import, unless you're overriding the styling
import '@knocklabs/react/dist/index.css';

type NotificationsTriggerProperties = {
  children: ReactElement;
};

export const NotificationsTrigger = ({
  children,
}: NotificationsTriggerProperties) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef<HTMLDivElement>(null);

  if (!keys().NEXT_PUBLIC_KNOCK_API_KEY) {
    return null;
  }

  return (
    <>
      {/* biome-ignore lint/nursery/noStaticElementInteractions: "avoid nested buttons" */}
      <div
        onClick={() => setIsVisible(!isVisible)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsVisible(!isVisible);
          }
        }}
        ref={notifButtonRef}
      >
        {children}
      </div>
      {notifButtonRef.current && (
        <NotificationFeedPopover
          buttonRef={notifButtonRef as RefObject<HTMLElement>}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      )}
    </>
  );
};
