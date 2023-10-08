import { UserButton, currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import Status from '@/components/status';
import { Button } from '@/components/ui/button';
import type { ReactElement } from 'react';

export const Navbar = async (): Promise<ReactElement> => {
  const user = await currentUser();

  return (
    <div
      className={cn(
        'flex items-center gap-8 backdrop-blur-sm justify-between border-b px-6 py-3',
        'bg-white/90 border-neutral-200',
        'dark:bg-black/90 dark:border-neutral-800'
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
        <p className="text-lg text-black dark:text-white font-medium">
          next-forge
        </p>
      </Link>
      <div className="flex items-center gap-2">
        <Status />
        <ModeToggle />
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
