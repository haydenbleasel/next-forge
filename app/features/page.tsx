import Link from 'next/link';
import Image from 'next/image';
import { features } from '@/lib/features';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Features';
const description = 'The following features are included out of the box.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/features',
});

const Features: FC = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <span className="mt-2 max-w-[750px] text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          {description}
        </span>
      </div>
      <div className="mt-8 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {features.map((feature) => (
          <Link
            href={feature.link}
            key={feature.name}
            className="mb-4 inline-block w-full"
          >
            <Card className="aspect-[4/3] flex flex-col justify-between gap-4">
              <CardHeader>
                <Image
                  src={feature.image}
                  alt=""
                  height={48}
                  width={48}
                  className="h-8 w-fit max-w-[5rem] object-contain dark:brightness-0 dark:invert"
                />
              </CardHeader>
              <CardHeader>
                <CardTitle>{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
