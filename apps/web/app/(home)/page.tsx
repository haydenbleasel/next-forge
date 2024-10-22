import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';
import { Cases } from './components/cases';
import { CTA } from './components/cta';
import { FAQ } from './components/faq';
import { Features } from './components/features';
import { Hero } from './components/hero';
import { Pricing } from './components/pricing';
import { Stats } from './components/stats';
import { Testimonials } from './components/testimonials';

const meta = {
  title: 'From zero to production in minutes.',
  description:
    "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, and more. It's all here.",
};

export const metadata: Metadata = createMetadata(meta);

const Home: FC = () => (
  <>
    <Hero />
    <Cases />
    <Features />
    <Stats />
    <Pricing />
    <Testimonials />
    <FAQ />
    <CTA />
  </>
);

export default Home;
