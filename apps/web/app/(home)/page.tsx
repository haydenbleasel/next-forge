import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';
import { Apps } from './components/apps';
import { Features } from './components/features';
import { Hero } from './components/hero';

const meta = {
  title: 'From zero to production in minutes.',
  description:
    "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, and more. It's all here.",
};

export const metadata: Metadata = createMetadata(meta);

const groups = [
  {
    title: 'Foundation',
    tools: [
      {
        href: 'https://react.dev/',
        name: 'React',
        description: 'A JavaScript library for building UIs.',
      },
      {
        href: 'https://nextjs.org',
        name: 'Next.js',
        description: 'The React framework for the web.',
      },
      {
        href: 'https://vercel.com/',
        name: 'Vercel',
        description: 'Hosting and deployment for Next.js.',
      },
      {
        href: 'https://turbo.build/repo',
        name: 'Turborepo',
        description: 'High-performance monorepo tooling.',
      },
      {
        href: 'https://clerk.com/',
        name: 'Clerk',
        description: 'User authentication and management.',
      },
      {
        href: 'https://stripe.com/',
        name: 'Stripe',
        description: 'Online payment processing.',
      },
    ],
  },
  {
    title: 'Languages',
    tools: [
      {
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        name: 'JavaScript',
        description: 'The programming language of the web.',
      },
      {
        href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        name: 'HTML',
        description: 'The markup language of the web.',
      },
      {
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        name: 'CSS',
        description: 'The styling language of the web.',
      },
      {
        href: 'https://www.typescriptlang.org/',
        name: 'TypeScript',
        description: 'JavaScript with types.',
      },
    ],
  },
  {
    title: 'Linting and Formatting',
    tools: [
      {
        href: 'https://www.ultracite.dev/',
        name: 'Ultracite',
        description: 'A unified editor configuration.',
      },
      {
        href: 'https://eslint.org/',
        name: 'ESLint',
        description: 'Find and fix problems in your JS.',
      },
      {
        href: 'https://prettier.io/',
        name: 'Prettier',
        description: 'An opinionated code formatter.',
      },
      {
        href: 'https://stylelint.io/',
        name: 'Stylelint',
        description: 'A mighty, modern CSS linter.',
      },
    ],
  },
  {
    title: 'Styling and Components',
    tools: [
      {
        href: 'https://ui.shadcn.com/',
        name: 'Shadcn UI',
        description: 'Beautifully designed components.',
      },
      {
        href: 'https://tailwindcss.com/',
        name: 'Tailwind CSS',
        description: 'A utility-first CSS framework.',
      },
      {
        href: 'https://vercel.com/font',
        name: 'Geist Font',
        description: 'A typeface by Vercel.',
      },
      {
        href: 'https://react-wrap-balancer.vercel.app/',
        name: 'React Wrap Balancer',
        description: 'Makes titles more readable.',
      },
    ],
  },
  {
    title: 'Database',
    tools: [
      {
        href: 'https://prisma.io/',
        name: 'Prisma',
        description: 'A TypeScript ORM for Node.js.',
      },
      {
        href: 'https://planetscale.com/',
        name: 'PlanetScale',
        description: 'The database for developers.',
      },
    ],
  },
  {
    title: 'Email',
    tools: [
      {
        href: 'https://react.email/',
        name: 'React Email',
        description: 'A React library for building emails.',
      },
      {
        href: 'https://resend.com/',
        name: 'Resend',
        description: 'The email service for developers.',
      },
    ],
  },
  {
    title: 'Error Tracking',
    tools: [
      {
        href: 'https://sentry.io/',
        name: 'Sentry',
        description: 'Application monitoring software.',
      },
      {
        href: 'https://betterstack.com/',
        name: 'BetterStack',
        description: 'Status and logging for web apps.',
      },
    ],
  },
  {
    title: 'Analytics',
    tools: [
      {
        href: 'https://vercel.com/analytics',
        name: 'Vercel Analytics',
        description: 'Better insights. Peak performance.',
      },
      {
        href: 'https://marketingplatform.google.com/about/analytics/',
        name: 'Google Analytics',
        description: 'Get essential customer insights.',
      },
      {
        href: 'https://segment.com/',
        name: 'Segment',
        description: 'The leading customer data platform.',
      },
    ],
  },
  {
    title: 'Documentation and Content',
    tools: [
      {
        href: 'https://contentlayer.dev/',
        name: 'Contentlayer',
        description: 'Content made easy for developers.',
      },
      {
        href: 'https://shiki.style/',
        name: 'Shiki',
        description: 'Powerful syntax highlighting.',
      },
      {
        href: 'https://github.com/axe312ger/sqip',
        name: 'Sqip',
        description: 'SVG-based LQIP generation.',
      },
      {
        href: 'https://github.com/rehypejs/rehype',
        name: 'Rehype',
        description: 'HTML processor powered by plugins.',
      },
      {
        href: 'https://remark.js.org/',
        name: 'Remark',
        description: 'Markdown processor powered by plugins.',
      },
      {
        href: 'https://mintlify.com/',
        name: 'Mintlify',
        description: 'The documentation you want, effortlessly.',
      },
    ],
  },
  {
    title: 'Other',
    tools: [
      {
        href: 'https://sdk.vercel.ai/',
        name: 'Vercel AI SDK',
        description: 'The AI Framework for TypeScript.',
      },
      {
        href: 'https://knock.app/',
        name: 'Knock',
        description: 'Powerful notifications infrastructure.',
      },
      {
        href: 'https://vercel.com/docs/cron-jobs',
        name: 'Vercel Cron Jobs',
        description: 'Run scheduled tasks on Vercel.',
      },
    ],
  },
];

const Home: FC = () => (
  <>
    <Hero />
    <Apps />
    <Features />
  </>
);

export default Home;
