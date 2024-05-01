import Link from 'next/link';
import Status from '@/components/status';
import { cn } from '@/lib/utils';
import { legal, pages } from '@/consts/navigation';
import { ActiveProvider } from '@/providers/active-provider';
import { Container } from '@/components/container';
import { Logo } from './logo';
import type { FC } from 'react';

export const Footer: FC = () => (
  <div
    className={cn(
      'py-16 border-t',
      'bg-white border-zinc-200',
      'dark:bg-black dark:border-zinc-800'
    )}
  >
    <Container>
      <div className="grid sm:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-8 col-span-2">
          <Logo />
          <Status />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">Pages</p>
          <div className="mt-2 flex flex-col gap-1">
            {pages.map(({ href, name }) => (
              <ActiveProvider key={name} href={href}>
                <Link
                  href={href}
                  className="text-sm hover:underline text-black dark:text-white group-[.active-page]:underline"
                >
                  {name}
                </Link>
              </ActiveProvider>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">Legal</p>
          <div className="mt-2 flex flex-col gap-1">
            {legal.map(({ href, name }) => (
              <ActiveProvider key={name} href={href}>
                <Link
                  href={href}
                  className="text-sm hover:underline text-black dark:text-white group-[.active-page]:underline"
                >
                  {name}
                </Link>
              </ActiveProvider>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </div>
);
