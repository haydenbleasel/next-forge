'use client';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type ActiveProviderProps = {
  readonly href: string;
  readonly children: ReactNode;
};

export const ActiveProvider: FC<ActiveProviderProps> = ({ href, children }) => {
  const pathname = usePathname();

  // I use `startsWith` here to handle nested routes
  const active = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <div
      className={cn('group', {
        'active-page': active,
      })}
    >
      {children}
    </div>
  );
};
