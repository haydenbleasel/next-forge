import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import { Card } from '@/components/ui/card';
import { features } from '@/lib/features';
import { Chat } from './components/chat';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'next-forge';
const description =
  'Robust and comprehensive boilerplate for modern Next.js web apps.';

export const metadata: Metadata = createMetadata({ title, description });

const Features: FC = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Features
      </h2>
      <div className="mt-6 columns-3 gap-4">
        {features.map((feature) => (
          <Link
            href={feature.link}
            key={feature.name}
            className="mb-4 inline-block"
          >
            <Card className="p-6 aspect-[4/3] flex flex-col justify-between gap-4">
              <Image
                src={feature.image}
                alt=""
                height={48}
                width={48}
                className="h-8 w-fit"
              />
              <div className="mt-4">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {feature.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Hero: FC = () => (
  <div className="container mx-auto flex flex-col items-start gap-8">
    <div className="flex flex-col gap-1">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <span className="mt-2 max-w-[750px] text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl">
        {description}
      </span>
      <Chat />
    </div>
  </div>
);

const Home: FC = () => (
  <div className="flex flex-col py-16">
    <Hero />
    <Features />
  </div>
);

export default Home;
