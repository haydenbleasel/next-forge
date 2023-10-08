import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Card } from '@/components/ui/card';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'next-forge';
const description =
  'Robust and comprehensive boilerplate for modern Next.js web apps.';

export const metadata: Metadata = createMetadata(title, description);

const features = [
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    link: 'https://ui.shadcn.com/',
  },
  {
    name: 'Radix UI',
    description:
      'An open source component library optimized for fast development, easy maintenance, and accessibility. Just import and go—no configuration required.',
    link: 'https://www.radix-ui.com/',
  },
  {
    name: 'Tailwind CSS',
    description:
      'Rapidly build modern websites without ever leaving your HTML.',
    link: 'https://tailwindcss.com/',
  },
  {
    name: 'PlanetScale',
    description:
      'PlanetScale is the world’s most advanced MySQL platform, powered by open source tech.',
    link: 'https://planetscale.com/',
  },
  {
    name: 'Prisma',
    description:
      'Next-generation Node.js and TypeScript ORM, unlocking a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.',
    link: 'https://www.prisma.io/',
  },
  {
    name: 'eslint-config-harmony',
    description:
      'A strict, opinionated ESLint config for modern TypeScript apps, designed to work seamlessly together and enforce hyper-strict syntax rules as you type to help you write bulletproof code.',
    link: 'https://github.com/haydenbleasel/eslint-config-harmony',
  },
  {
    name: 'Next.js 13',
    description:
      'The React Framework for the Web. Create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.',
    link: 'https://nextjs.org/',
  },
  {
    name: 'Vercel',
    description:
      "Vercel's frontend cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.",
    link: 'https://vercel.com/',
  },
  {
    name: 'react.email',
    description:
      'A collection of high-quality, unstyled components for creating beautiful emails using React and TypeScript.',
    link: 'https://react.email/',
  },
  {
    name: 'Clerk',
    description:
      'Clerk is more than a "sign-in box." Integrate complete user management UIs and APIs, purpose-built for React, Next.js, and the Modern Web.',
    link: 'https://clerk.com/',
  },
  {
    name: 'Resend',
    description:
      'Email for. developers. The best API to reach humans instead of spam folders. Build, test, and deliver transactional emails at scale.',
    link: 'https://resend.com/',
  },
  {
    name: 'Loops',
    description:
      'Email for modern SaaS. A better way to send marketing + transactional email',
    link: 'https://loops.so/',
  },
  {
    name: 'next-secure-headers',
    description: 'Sets secure response headers for Next.js.',
    link: 'https://www.npmjs.com/package/next-secure-headers',
  },
  {
    name: 'BetterStack',
    description:
      'Better Stack lets you see inside any stack, debug any issue, and resolve any incident.',
    link: 'https://betterstack.com/',
  },
];

const Features: FC = () => (
  <section className="py-16 bg-neutral-100">
    <div className="container mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Features
      </h2>
      <div className="mt-6 grid grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link href={feature.link} key={feature.name}>
            <Card className="p-6 aspect-[4/3] flex flex-col justify-between gap-4">
              <div className="w-12 aspect-square rounded bg-neutral-100 dark:bg-neutral-900" />
              <div className="mt-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {feature.name}
                </h3>
                <p className="leading-7 mt-2">{feature.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Hero: FC = () => (
  <div className="container mx-auto flex flex-col items-start gap-8">
    <div className="flex flex-col gap-1">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <span className="max-w-[750px] text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl">
        {description}
      </span>
    </div>
  </div>
);

const Home: FC = () => (
  <div className="flex h-full w-full flex-col bg-neutral-100 py-16">
    <Hero />
    <Features />
  </div>
);

export default Home;
