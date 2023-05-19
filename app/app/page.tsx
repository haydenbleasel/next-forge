import { Button } from '@beskar-labs/gravity/button';
import Image from 'next/image';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'You are authenticated!';
const description = 'Welcome to the authenticated page!';

export const metadata: Metadata = createMetadata(title, description);

const Home: FC = () => (
  <div className="flex h-screen w-screen flex-col justify-center">
    <div className="container mx-auto flex flex-col items-start gap-8">
      <Image
        src="https://www.beskar.co/logo.svg"
        alt="Beskar Labs"
        width={85}
        height={18}
        unoptimized
      />
      <div className="flex flex-col gap-1">
        <p className="text-xl font-medium text-neutral-900">{title}</p>
        <p className="text-xl text-neutral-500">{description}</p>
      </div>
      <Button href="/logout">
        <span>Logout</span>
        <ArrowRightOnRectangleIcon className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default Home;
