import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/container';
import { Chat } from './components/chat';
import { Waitlist } from './components/waitlist';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'next-forge';
const description =
  'Robust and comprehensive boilerplate for modern Next.js web apps.';

export const metadata: Metadata = createMetadata({ title, description });

const Hero: FC = () => (
  <Container className="flex flex-col items-start gap-8">
    <div className="flex flex-col gap-1">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <span className="mt-2 max-w-[750px] text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
        {description}
      </span>
      <pre className="bg-black text-white text-sm p-4 rounded">
        yarn create next-app --example
        https://github.com/haydenbleasel/next-forge
      </pre>
      <Waitlist />
    </div>
  </Container>
);

const Home: FC = () => (
  <div className="flex flex-col py-16">
    <Hero />
    <Chat />
  </div>
);

export default Home;
