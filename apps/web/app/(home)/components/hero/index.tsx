import Image from 'next/image';
import type { FC } from 'react';

import { GitHubButton } from './github-button';
import { Installer } from './installer';
import NextLogo from './next.svg';
import TurborepoLogo from './turborepo.svg';

export const Hero: FC = () => (
  <section className="container mx-auto flex max-w-5xl flex-col items-center gap-2 py-8 md:py-12 lg:py-16">
    <h1 className="text-center font-bold text-3xl leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
      Production-grade{' '}
      <Image
        src={TurborepoLogo}
        alt=""
        width={48}
        height={48}
        className="h-6 md:h-12 w-auto inline-block align-baseline select-none pointer-events-none"
      />{' '}
      monorepo template for{' '}
      <Image
        src={NextLogo}
        alt=""
        width={48}
        height={48}
        className="h-6 md:h-12 w-auto inline-block align-baseline select-none pointer-events-none"
      />{' '}
      Next.js apps.
    </h1>
    <p className="mt-6 max-w-lg text-pretty text-center text-lg text-muted-foreground sm:text-xl">
      From zero to production in minutes. next-forge is a production-grade
      boilerplate for modern Next.js apps. It's designed to have everything you
      need to build your new SaaS app as quick as possible. Authentication,
      billing, analytics, SEO, and more. It's all here.
    </p>
    <div className="mt-4 flex w-full items-center justify-center space-x-4">
      <Installer />
      <GitHubButton />
    </div>
  </section>
);
