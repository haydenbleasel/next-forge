import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';
import { Apps } from './components/apps';
import { Features } from './components/features';
import { Hero } from './components/hero';

const meta = {
  title: 'Production-grade Turborepo template for Next.js apps',
  description:
    "A monorepo template designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, database ORM and more — it's all here.",
};

export const metadata: Metadata = createMetadata(meta);

const Home: FC = () => (
  <>
    <Hero />
    <Apps />
    <Features />
  </>
);

export default Home;
