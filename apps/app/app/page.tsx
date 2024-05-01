import { createMetadata } from '@repo/design-system/lib/metadata';
import { Chat } from './components/chat';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'From zero to production in minutes.';
const description =
  "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Billing, authentication, analytics, SEO, and more. It's all here.";

export const metadata: Metadata = createMetadata({ title, description });

const Home: FC = () => (
  <div className="flex flex-col py-16">
    <Chat />
  </div>
);

export default Home;
