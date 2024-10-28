import { cn } from '@repo/design-system/lib/utils';
import Image from 'next/image';

import BetterStack from './better-stack.svg';
import Clerk from './clerk.svg';
import ContentCollections from './content-collections.png';
import GoogleAnalytics from './google-analytics.svg';
import Prisma from './prisma.svg';
import Radix from './radix.svg';

import ReactEmail from './react-email.svg';
import Sentry from './sentry.svg';
import Stripe from './stripe.svg';
import Svix from './svix.svg';
import Tailwind from './tailwind.svg';
import TypeScript from './typescript.svg';

import DateFns from './date-fns.svg';
import Lucide from './lucide.svg';
import Neon from './neon.svg';
import React from './react.svg';
import Ultracite from './ultracite.svg';
import Vercel from './vercel.svg';

import Cmdk from './cmdk.svg';
import Fumadocs from './fumadocs.svg';
import Posthog from './posthog.svg';
import Recharts from './recharts.svg';
import Resend from './resend.svg';
import Zod from './zod.svg';

const rows = [
  {
    row: [
      {
        label: 'BetterStack',
        src: BetterStack,
        className: '[animation-delay:-26s] [animation-duration:30s]',
      },
      {
        label: 'Clerk',
        src: Clerk,
        className: '[animation-delay:-8s] [animation-duration:30s]',
      },
      {
        label: 'Ultracite',
        src: Ultracite,
        className: '[animation-delay:-18s] [animation-duration:30s]',
      },
      {
        label: 'Resend',
        src: Resend,
        className: '[animation-delay:-22s] [animation-duration:30s]',
      },
    ],
  },
  {
    row: [
      {
        label: 'Content Collections',
        src: ContentCollections,
        className: '[animation-delay:-40s] [animation-duration:40s]',
      },
      {
        label: 'Google Analytics',
        src: GoogleAnalytics,
        className: '[animation-delay:-20s] [animation-duration:40s]',
      },
      {
        label: 'Lucide',
        src: Lucide,
        className: '[animation-delay:-30s] [animation-duration:40s]',
      },
      {
        label: 'Posthog',
        src: Posthog,
        className: '[animation-delay:-35s] [animation-duration:40s]',
      },
    ],
  },
  {
    row: [
      {
        label: 'Prisma',
        src: Prisma,
        className: '[animation-delay:-10s] [animation-duration:40s]',
      },
      {
        label: 'Radix UI',
        src: Radix,
        className: '[animation-delay:-32s] [animation-duration:40s]',
      },
      {
        label: 'Date-fns',
        src: DateFns,
        className: '[animation-delay:-22s] [animation-duration:40s]',
      },
      {
        label: 'Fumadocs',
        src: Fumadocs,
        className: '[animation-delay:-28s] [animation-duration:40s]',
      },
    ],
  },
  {
    row: [
      {
        label: 'React Email',
        src: ReactEmail,
        className: '[animation-delay:-45s] [animation-duration:45s]',
      },
      {
        label: 'Sentry',
        src: Sentry,
        className: '[animation-delay:-23s] [animation-duration:45s]',
      },
      {
        label: 'React',
        src: React,
        className: '[animation-delay:-34s] [animation-duration:45s]',
      },
      {
        label: 'CMDK',
        src: Cmdk,
        className: '[animation-delay:-39s] [animation-duration:45s]',
      },
    ],
  },
  {
    row: [
      {
        label: 'Stripe',
        src: Stripe,
        className: '[animation-delay:-55s] [animation-duration:60s]',
      },
      {
        label: 'Tailwind CSS',
        src: Tailwind,
        className: '[animation-delay:-20s] [animation-duration:60s]',
      },
      {
        label: 'Neon',
        src: Neon,
        className: '[animation-delay:-38s] [animation-duration:60s]',
      },
      {
        label: 'Recharts',
        src: Recharts,
        className: '[animation-delay:-45s] [animation-duration:60s]',
      },
    ],
  },
  {
    row: [
      {
        label: 'TypeScript',
        src: TypeScript,
        className: '[animation-delay:-9s] [animation-duration:40s]',
      },
      {
        label: 'Svix',
        src: Svix,
        className: '[animation-delay:-28s] [animation-duration:40s]',
      },
      {
        label: 'Vercel',
        src: Vercel,
        className: '[animation-delay:-18s] [animation-duration:40s]',
      },
      {
        label: 'Zod',
        src: Zod,
        className: '[animation-delay:-33s] [animation-duration:40s]',
      },
    ],
  },
];

export const Features = () => (
  <section className="dark h-[400px] sm:h-[800px]">
    <div
      aria-hidden="true"
      className="relative mx-2 h-full overflow-hidden rounded-4xl bg-background py-24 ring-1 ring-black/5 ring-inset sm:py-32"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 mx-auto w-full max-w-[90%] text-center">
        <div className="relative z-10">
          <h2 className="font-medium text-base/7 text-muted-foreground">
            Modern developer experience
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-pretty font-bold text-4xl text-foreground tracking-tighter sm:text-5xl">
            React-based framework with Rust-based tooling
          </p>
        </div>
      </div>
      <div className="absolute inset-0 grid grid-cols-1 pt-0 [container-type:inline-size]">
        {rows.map((rowData, index) => (
          <div className="group relative" key={index}>
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[length:12px_100%] bg-gradient-to-r from-[2px] from-foreground/15 to-[2px]" />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[length:12px_100%] bg-gradient-to-r from-[2px] from-foreground/5 to-[2px] group-last:hidden" />
            {rowData.row.map((logo, _logoIndex) => (
              <div
                key={logo.label}
                className={cn(
                  logo.className,
                  'absolute top-[50px] grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1',
                  'rounded-full bg-gradient-to-t from-50% from-background/50 to-secondary/50 ring-1 ring-foreground/10 ring-inset backdrop-blur-sm',
                  '[--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:running] [animation-timing-function:linear]'
                )}
              >
                <Image alt="" src={logo.src} className="size-4" />
                <span className="font-medium text-foreground text-sm/6">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
