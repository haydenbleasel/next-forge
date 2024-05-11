import Link from 'next/link';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import { Container } from '@repo/design-system/components/container';
import { cn } from '@repo/design-system/lib/utils';
import { Logo } from '@repo/design-system/components/logo';
import { pages } from '@/lib/consts';
import type { FC } from 'react';

if (!process.env.APP_URL) {
  throw new Error('APP_URL env variable is required');
}

const signInUrl = new URL('/sign-in', process.env.APP_URL).toString();

export const Navbar: FC = () => (
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
            <Button
              key={name}
              asChild
              variant="link"
              className="group-[.active-page]:underline"
            >
              <Link href={href}>{name}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button asChild>
          <Link href={signInUrl}>Login</Link>
        </Button>
      </div>
    </Container>
  </div>
);
