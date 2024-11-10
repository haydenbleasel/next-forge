import Image from 'next/image';

import { Installer } from '../installer';
import Logo from './logo.svg';
import NextLogo from './next.svg';
import { RepoInfo } from './repo-info';
import TurborepoLogo from './turborepo.svg';

export const Hero = () => (
  <div className="mx-2 mt-2 rounded-4xl bg-neutral-50 ring-1 ring-black/5 ring-inset dark:bg-neutral-950">
    <section className="container mx-auto flex max-w-4xl flex-col items-center gap-2 py-24 sm:py-32">
      <Image
        src={Logo}
        alt="Logo"
        width={48}
        height={48}
        className="dark:invert"
      />
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
          className="pointer-events-none mx-1.5 inline-block h-6 w-auto translate-y-0.5 select-none align-baseline md:h-12 md:translate-y-1 dark:invert"
        />
        Next.js apps
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-center text-neutral-950/70 sm:text-lg dark:text-white/70">
        A monorepo template designed to have everything you need to build your
        new SaaS app as quick as possible. Authentication, billing, analytics,
        SEO, database ORM and more — it's all here.
      </p>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Installer />
          <a
            href="https://docs.next-forge.com/"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-orange-600"
          >
            Read the docs
          </a>
        </div>
        <RepoInfo />
      </div>
    </section>
  </div>
);
