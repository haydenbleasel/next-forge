import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Beskar Forge';
const description = 'A Next.js starter template by Beskar Labs';

export const metadata: Metadata = createMetadata(title, description);

const Home: FC = () => (
  <div className="flex h-full w-full flex-col justify-center bg-neutral-100">
    <div className="container mx-auto flex flex-col items-start gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-xl font-medium text-neutral-900">{title}</p>
        <p className="text-xl text-neutral-500">{description}</p>
      </div>
    </div>
  </div>
);

export default Home;
