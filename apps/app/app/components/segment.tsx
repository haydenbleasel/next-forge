'use client';

import { useUser } from '@clerk/nextjs';
import { analytics } from '@repo/design-system/lib/segment/client';
import { usePathname, useSearchParams } from 'next/navigation';
import { type FC, useEffect } from 'react';

export const Segment: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      analytics.identify(user.id);
    }
  }, [user]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger on every page change
  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams]);

  return null;
};
