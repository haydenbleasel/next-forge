import { UserButton, currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Notifications } from '@/components/notifications';
import { ActiveProvider } from '@/providers/active-provider';
import { pages } from '@/consts/navigation';
import { Container } from '@/components/container';
import { Logo } from './logo';
import type { ReactElement } from 'react';

export const Navbar = async (): Promise<ReactElement> => {
  const user = await currentUser();

  return (
    <div
      className={cn(
        'sticky top-0 backdrop-blur-sm border-b py-3 z-50',
        'bg-white/90 border-zinc-200',
        'dark:bg-black/90 dark:border-zinc-800'
      )}
    >
      <Container className="flex items-center gap-8 justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden sm:flex items-center">
            {pages.map(({ name, href }) => (
              <ActiveProvider key={name} href={href}>
                <Button
                  asChild
                  variant="link"
                  className="group-[.active-page]:underline"
                >
                  <Link href={href}>{name}</Link>
                </Button>
              </ActiveProvider>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Notifications />
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};
