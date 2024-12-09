import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import ApiImage from './api.png';
import AppImage from './app.png';
import DocsImage from './docs.png';
import EmailImage from './email.png';
import StudioImage from './studio.png';
import WebImage from './web.png';

const apps = [
  {
    name: 'App',
    title: 'Lightning-fast app template',
    description:
      "Start building your app with a shadcn/ui template that's already set up with everything you need — Tailwind, Clerk and more.",
    image: AppImage,
  },
  {
    name: 'API',
    title: 'Cross-platform API',
    description:
      'Create an API microservice for many different apps, with a type-safe database ORM.',
    image: ApiImage,
  },
  {
    name: 'Email',
    title: 'React-based email templates',
    description:
      'Create and preview email templates with a React-based email library.',
    image: EmailImage,
  },
  {
    name: 'Website',
    title: 'Robust, type-safe website',
    description:
      'A twblocks website template with a type-safe blog, bulletproof SEO and legal pages, powered by BaseHub.',
    image: WebImage,
  },
  {
    name: 'Docs',
    title: 'Powered by Mintlify',
    description:
      'Simple, beautiful out of the box and easy to maintain documentation.',
    image: DocsImage,
  },
  {
    name: 'Studio',
    title: 'Visual database editor',
    description:
      'Use Prisma Studio to visualize your database, and generate Prisma client code.',
    image: StudioImage,
  },
];

export const Apps = () => (
  <div className="py-24 sm:py-32" id="apps">
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 className="font-medium text-base/7 text-neutral-500 dark:text-neutral-400">
        Deploy at scale
      </h2>
      <p className="mt-2 max-w-lg text-pretty font-bold text-3xl text-neutral-950 tracking-tighter sm:text-5xl dark:text-white">
        Get from zero to production in minutes.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        {apps.map((app, index) => (
          <div
            className={twMerge(
              'relative',
              [0, 3, 4].includes(index) ? 'lg:col-span-4' : 'lg:col-span-2'
            )}
            key={app.name}
          >
            <div
              className={twMerge(
                'absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] dark:bg-neutral-950',
                !index && 'lg:rounded-tl-[2rem]',
                index === 1 && 'lg:rounded-tr-[2rem]',
                index === 4 && 'lg:rounded-bl-[2rem]',
                index === 5 && 'lg:rounded-br-[2rem]'
              )}
            />
            <div
              className={twMerge(
                'relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]',
                !index && 'lg:rounded-tl-[calc(2rem+1px)]',
                index === 1 && 'lg:rounded-tr-[calc(2rem+1px)]',
                index === 4 && 'lg:rounded-bl-[calc(2rem+1px)]',
                index === 5 && 'lg:rounded-br-[calc(2rem+1px)]'
              )}
            >
              <div className="h-48 overflow-hidden border-b bg-neutral-50 p-8 md:h-80 dark:bg-neutral-950">
                <Image
                  alt=""
                  src={app.image}
                  className={twMerge(
                    'h-auto w-full overflow-hidden rounded-md border object-cover object-left',
                    [0, 3, 4].includes(index)
                      ? ''
                      : 'md:h-[120%] md:w-auto md:max-w-none'
                  )}
                />
              </div>
              <div className="p-10">
                <h3 className="font-medium text-neutral-500 text-sm/4 dark:text-neutral-400">
                  {app.name}
                </h3>
                <p className="mt-2 font-semibold text-lg/7 text-neutral-950 tracking-tight dark:text-white">
                  {app.title}
                </p>
                <p className="mt-2 max-w-lg text-neutral-500 text-sm/6 dark:text-neutral-400">
                  {app.description}
                </p>
              </div>
            </div>
            <div
              className={twMerge(
                'pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] dark:ring-white/5',
                !index && 'lg:rounded-tl-[2rem]',
                index === 1 && 'lg:rounded-tr-[2rem]',
                index === 4 && 'lg:rounded-bl-[2rem]',
                index === 5 && 'lg:rounded-br-[2rem]'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
