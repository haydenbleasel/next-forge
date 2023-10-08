import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import Status from '@/components/status';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Beskar Forge';
const description = 'A Next.js starter template by Beskar Labs';

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
      <Button asChild>
        <Link href="/login">
          Login
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
    <Status />
  </div>
);

export default Home;
