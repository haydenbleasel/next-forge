import Link from 'next/link';
import Image from 'next/image';
import { features } from '@/lib/features';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FC } from 'react';

const Features: FC = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Features
      </h2>
      <div className="mt-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
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
