import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Hello, world.';
const description = 'This is a Next.js starter template.';

export const metadata: Metadata = createMetadata(title, description);

const Home: FC = () => (
  <>
    <p className="text-xl text-neutral-900">{title}</p>
    <p className="text-xl text-neutral-500">{description}</p>
  </>
);

export default Home;
