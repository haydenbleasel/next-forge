import Image from 'next/image';
import { Installer } from '../installer';
import { Video } from '../video';
import NextLogo from './next.svg';
import TurborepoLogo from './turborepo.svg';

export const Hero = () => (
  <div className="border-neutral-200 border-b bg-neutral-50 py-16 sm:py-24">
    <section className="container mx-auto grid items-center gap-8 px-4 sm:grid-cols-5 sm:gap-16">
      <div className="flex flex-col gap-6 sm:col-span-2">
        <h1 className="font-bold text-3xl leading-tight tracking-tighter sm:text-5xl lg:leading-[1.1]">
          Production-grade{' '}
          <Image
            src={TurborepoLogo}
            alt=""
            width={38}
            height={38}
            className="pointer-events-none mx-1.5 inline-block h-6 w-auto translate-y-0.5 select-none align-baseline sm:h-[38px] md:translate-y-1"
          />
          Turborepo template for{' '}
          <Image
            src={NextLogo}
            alt=""
            width={38}
            height={38}
            className="pointer-events-none mx-1.5 inline-block h-6 w-auto translate-y-0.5 select-none align-baseline sm:h-[38px] md:translate-y-1 dark:invert"
          />
          Next.js apps
        </h1>
        <p className="text-pretty text-neutral-950/70 sm:text-lg dark:text-white/70">
          A monorepo template designed to have everything you need to build your
          new SaaS app as quick as possible. Authentication, billing, analytics,
          SEO, database ORM and more — it's all here.
        </p>
        <Installer />
      </div>
      <div className="pointer-events-none select-none overflow-hidden rounded-lg sm:col-span-3">
        <Video
          controls={false}
          playing
          muted
          loop
          url="https://youtu.be/4LRXL6l-FS4"
          aspectRatio="3440 / 2160"
        />
      </div>
    </section>
  </div>
);
