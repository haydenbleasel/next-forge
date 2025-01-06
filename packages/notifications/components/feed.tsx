'use client';

import {
  NotificationFeedPopover,
  NotificationIconButton,
} from '@knocklabs/react';
import { useRef, useState } from 'react';

// Required CSS import, unless you're overriding the styling
import '@knocklabs/react/dist/index.css';

export const KnockNotificationFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={() => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
};
