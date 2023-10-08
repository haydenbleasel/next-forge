import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import type { FC } from 'react';

export const Navbar: FC = () => (
  <div
    className={cn(
      'flex items-center gap-8 backdrop-blur-sm justify-between border-b px-6 py-3',
      'bg-white/90 border-neutral-200',
      'dark:bg-black/90 dark:border-neutral-800'
    )}
  >
    <Image src="/logo.svg" alt="" width={24} height={24} />
    <UserButton afterSignOutUrl="/" />
    <ModeToggle />
  </div>
);
