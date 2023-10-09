import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/container';
import { Card } from '@/components/ui/card';
import { features } from '@/app/(delete-me)/features/features';
import { cn } from '@/lib/utils';
import { Chat } from '../components/chat';
import { Waitlist } from '../components/waitlist';
import { Command } from './components/command';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'From zero to production in minutes.';
const description =
  "next-forge is a robust and comprehensive boilerplate for modern Next.js web apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Billing, authentication, analytics, SEO, and more. It's all here.";

export const metadata: Metadata = createMetadata({ title, description });

const logos = features.map((feature) => feature.image);

const Graphic: FC = () => (
  <div className="relative aspect-square w-full">
    <div className="absolute left-[5%] top-[5%] w-[90%] aspect-square border border-zinc-200 dark:border-zinc-800 rounded-full" />
    <div className="absolute left-[15%] top-[15%] w-[70%] aspect-square border border-zinc-200 dark:border-zinc-800 rounded-full" />
    <div className="absolute left-[25%] top-[25%] w-[50%] aspect-square border border-zinc-200 dark:border-zinc-800 rounded-full" />
    <div className="absolute left-[35%] top-[35%] w-[30%] aspect-square border border-zinc-200 dark:border-zinc-800 rounded-full" />

    {logos.slice(0, 5).map((logo, index) => (
      <Card
        className={cn(
          'absolute rounded-full p-3 flex w-12 h-12 items-center justify-center -ml-6 -mt-6 top-1/2 left-1/2'
        )}
        style={{
          animation: 'orbit-1 10s linear infinite',
          animationDelay: `${index * (10 / 5)}s`,
        }}
        key={index}
      >
        <Image
          src={logo}
          alt=""
          width={32}
          height={32}
          className="object-contain dark:invert dark:brightness-0"
        />
      </Card>
    ))}

    {logos.slice(7, 14).map((logo, index) => (
      <Card
        className={cn(
          'absolute rounded-full p-3 flex w-12 h-12 items-center justify-center -ml-6 -mt-6 top-1/2 left-1/2'
        )}
        style={{
          animation: 'orbit-2 15s linear infinite',
          animationDelay: `${index * (15 / 7)}s`,
        }}
        key={logo}
      >
        <Image
          src={logo}
          alt=""
          width={32}
          height={32}
          className="object-contain dark:invert dark:brightness-0"
        />
      </Card>
    ))}

    {logos.slice(14, features.length).map((logo, index) => (
      <Card
        className={cn(
          'absolute rounded-full p-3 flex w-12 h-12 items-center justify-center -ml-6 -mt-6 top-1/2 left-1/2'
        )}
        style={{
          animation: 'orbit-3 20s linear infinite',
          animationDelay: `${(index * 20) / (features.length - 14)}s`,
        }}
        key={logo}
      >
        <Image
          src={logo}
          alt=""
          width={32}
          height={32}
          className="object-contain dark:invert dark:brightness-0"
        />
      </Card>
    ))}

    <Image
      src="/logo.svg"
      alt="Next Forge"
      width={32}
      height={32}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 object-contain"
    />
  </div>
);

const Hero: FC = () => (
  <Container className="grid grid-cols-2 gap-32 items-center">
    <div className="flex flex-col gap-1">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <p className="mt-4 leading-relaxed text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl sm:leading-relaxed">
        {description}
      </p>
      <div className="mt-8 flex flex-col gap-2">
        <p className="font-medium text-zinc-600 dark:text-zinc-400">
          Copy and paste this command into your terminal:
        </p>
        <Command />
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <p className="font-medium text-zinc-600 dark:text-zinc-400">
          Interested in updates? Join the mailing list:
        </p>
        <Waitlist />
      </div>
    </div>
    <Graphic />
  </Container>
);

const Home: FC = () => (
  <div className="flex flex-col py-16">
    <Hero />
    <Chat />
  </div>
);

export default Home;
