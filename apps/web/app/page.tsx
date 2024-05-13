import { Container } from '@repo/design-system/components/container';
import { createMetadata } from '@repo/design-system/lib/metadata';
import { Prose } from '@repo/design-system/components/prose';
import { Link } from '@repo/design-system/components/link';
import { cn } from '@repo/design-system/lib/utils';
import Image from 'next/image';
import { Command } from '@/components/command';
import { Waitlist } from '@/components/waitlist';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

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
        href: 'https://github.com/haydenbleasel/eslint-config-harmony',
        name: 'eslint-config-harmony',
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

const Tool: FC<{
  readonly href: string;
  readonly name: string;
  readonly description: string;
}> = ({ href, name, description }) => {
  const { hostname } = new URL(href);

  return (
    <Link
      href={href}
      key={href}
      className={cn(
        'no-underline items-center flex gap-4 p-4 rounded-lg transition-colors',
        'hover:bg-neutral-100',
        'dark:hover:bg-neutral-800'
      )}
    >
      <Image
        src={`https://logo.clearbit.com/${hostname.replace('www.', '')}`}
        alt={hostname}
        width={32}
        height={32}
        className="rounded-md object-cover w-8 h-8 shrink-0"
        quality={100}
      />
      <div>
        <p
          className={cn(
            'text-sm font-medium',
            'text-neutral-900',
            'dark:text-neutral-100'
          )}
        >
          {name}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </Link>
  );
};

const Card: FC<{
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
}> = ({ title, children, className }) => (
  <div
    className={cn('rounded-2xl p-1', 'bg-neutral-100', 'dark:bg-neutral-900')}
  >
    <p
      className={cn(
        'text-sm font-medium py-2 px-4',
        'text-neutral-900',
        'dark:text-neutral-100'
      )}
    >
      {title}
    </p>
    <div
      className={cn(
        'border rounded-xl overflow-hidden shadow-sm',
        'bg-white border-neutral-200',
        'dark:bg-neutral-950 dark:border-neutral-800',
        className
      )}
    >
      {children}
    </div>
  </div>
);

const Home: FC = () => (
  <div className="flex flex-col py-16">
    <Container className="grid grid-cols-3 gap-24">
      <div>
        <Prose>
          <h1 className="text-5xl font-bold">{meta.title}</h1>
          <p>{meta.description}</p>
          <p>Copy and paste this command into your terminal:</p>
          <Command code="pnpm create next-app --example https://github.com/haydenbleasel/next-forge" />
          <p>Interested in updates? Join the mailing list:</p>
          <Waitlist />
        </Prose>
      </div>
      <div className="col-span-2 space-y-4">
        {groups.map((group) => (
          <Card
            title={group.title}
            className="p-2 grid sm:grid-cols-2 gap-x-2"
            key={group.title}
          >
            {group.tools.map((tool) => (
              <Tool {...tool} key={tool.href} />
            ))}
          </Card>
        ))}
      </div>
    </Container>
  </div>
);

export default Home;
