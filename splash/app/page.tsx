import type { Metadata } from 'next';
import { Apps } from './components/apps';
import { CallToAction } from './components/cta';
import { Features } from './components/features';
import { Hero } from './components/hero';
import { Social } from './components/social';

export const metadata: Metadata = {
  title: 'Production-grade Turborepo template for Next.js apps',
  description:
    "A monorepo template designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, database ORM and more — it's all here.",
};

const Home = () => (
  <>
    <Hero />
    <Apps />
    <Features />
    <Social />
    <CallToAction />
  </>
);

export default Home;
