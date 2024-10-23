import Image from 'next/image';
import type { FC } from 'react';

import { Installer } from '../installer';
import { GitHubButton } from './github-button';
import Logo from './logo.svg';
import NextLogo from './next.svg';
import TurborepoLogo from './turborepo.svg';

export const Hero: FC = () => (
  <div className="mx-2 mt-2 rounded-4xl bg-secondary ring-1 ring-black/5 ring-inset">
    <section className="container mx-auto flex max-w-5xl flex-col items-center gap-2 py-24 sm:py-32">
      <Image src={Logo} alt="Logo" width={48} height={48} />
      <h1 className="mt-8 text-center font-bold text-3xl leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Production-grade{' '}
        <Image
          src={TurborepoLogo}
          alt=""
          width={48}
          height={48}
          className="pointer-events-none mx-1.5 inline-block h-6 w-auto translate-y-0.5 select-none align-baseline md:h-12 md:translate-y-1"
        />
        Turborepo template for{' '}
        <Image
          src={NextLogo}
          alt=""
          width={48}
          height={48}
          className="pointer-events-none mx-1.5 inline-block h-6 w-auto translate-y-0.5 select-none align-baseline md:h-12 md:translate-y-1"
        />
        Next.js apps
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-center text-foreground/70 text-lg">
        A monorepo template designed to have everything you need to build your
        new SaaS app as quick as possible. Authentication, billing, analytics,
        SEO, database ORM and more — it's all here.
      </p>
      <div className="mt-4 flex w-full items-center justify-center space-x-4">
        <Installer />
        <GitHubButton />
      </div>
    </section>
  </div>
);
