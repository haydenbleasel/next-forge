import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/container';
import { Chat } from '../components/chat';
import { Waitlist } from '../components/waitlist';
import { Command } from './components/command';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'From zero to production in minutes.';
const description =
  "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Billing, authentication, analytics, SEO, and more. It's all here.";

export const metadata: Metadata = createMetadata({ title, description });

const Hero: FC = () => (
  <Container className="flex flex-col gap-4 sm:text-center sm:items-center">
    <Image
      src="/logo.svg"
      alt=""
      width={64}
      height={64}
      className="dark:invert sm:mx-auto"
    />
    <h1 className="mt-8 scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl max-w-2xl sm:mx-auto">
      {title}
    </h1>
    <p className="mt-4 leading-relaxed text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl sm:leading-relaxed max-w-3xl sm:mx-auto">
      {description}
    </p>
    <div className="mt-8 flex flex-col gap-2 max-w-xl w-full sm:mx-auto">
      <p className="font-medium text-zinc-600 dark:text-zinc-400">
        Copy and paste this command into your terminal:
      </p>
      <Command />
    </div>
    <div className="mt-8 flex flex-col gap-2 max-w-xl w-full sm:mx-auto">
      <p className="font-medium text-zinc-600 dark:text-zinc-400">
        Interested in updates? Join the mailing list:
      </p>
      <Waitlist />
    </div>
    <Image
      src="/graphic.png"
      width={2160}
      height={1136}
      alt=""
      className="mt-8 rounded ring-1 ring-black/10 overflow-hidden"
    />
  </Container>
);

const Home: FC = () => (
  <div className="flex flex-col py-16">
    <Hero />
    <Chat />
  </div>
);

export default Home;
