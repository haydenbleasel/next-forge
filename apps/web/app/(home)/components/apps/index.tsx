import type { FC } from 'react';

export const Apps: FC = () => (
  <div className="bg-background py-24 sm:py-32">
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-base/7 font-semibold text-indigo-600">
        Deploy faster
      </h2>
      <p className="mt-2 max-w-lg text-pretty text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
        Get from zero to production in minutes.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <div className="relative lg:col-span-3">
          <div className="absolute inset-px rounded-lg bg-background max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/component-images/bento-01-performance.png"
              className="h-80 object-cover object-left"
            />
            <div className="p-10 pt-4">
              <h3 className="text-sm/4 font-semibold text-indigo-600">App</h3>
              <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                Lightning-fast app template
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                Start building your app with a template that's already set up
                with everything you need — Tailwind, shadcn/ui, Clerk and more.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-foreground/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
        </div>
        <div className="relative lg:col-span-3">
          <div className="absolute inset-px rounded-lg bg-background lg:rounded-tr-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/component-images/bento-01-releases.png"
              className="h-80 object-cover object-left lg:object-right"
            />
            <div className="p-10 pt-4">
              <h3 className="text-sm/4 font-semibold text-indigo-600">
                Website
              </h3>
              <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                Robust, type-safe website
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                Create a website with a type-safe blog, bulletproof SEO, legal
                pages and automatically generated OpenGraph cover images.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-foreground/5 lg:rounded-tr-[2rem]" />
        </div>
        <div className="relative lg:col-span-2">
          <div className="absolute inset-px rounded-lg bg-background lg:rounded-bl-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/component-images/bento-01-speed.png"
              className="h-80 object-cover object-left"
            />
            <div className="p-10 pt-4">
              <h3 className="text-sm/4 font-semibold text-indigo-600">API</h3>
              <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                Cross-platform API
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                Create an API microservice for many different apps, with a
                type-safe database ORM.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-foreground/5 lg:rounded-bl-[2rem]" />
        </div>
        <div className="relative lg:col-span-2">
          <div className="absolute inset-px rounded-lg bg-background" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/component-images/bento-01-integrations.png"
              className="h-80 object-cover object-center"
            />
            <div className="p-10 pt-4">
              <h3 className="text-sm/4 font-semibold text-indigo-600">Docs</h3>
              <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                Powered by Mintlify
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                Simple, beautiful out of the box and easy to maintain
                documentation.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-foreground/5" />
        </div>
        <div className="relative lg:col-span-2">
          <div className="absolute inset-px rounded-lg bg-background max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/component-images/bento-01-network.png"
              className="h-80 object-cover object-center"
            />
            <div className="p-10 pt-4">
              <h3 className="text-sm/4 font-semibold text-indigo-600">Email</h3>
              <p className="mt-2 text-lg/7 font-medium tracking-tight text-foreground">
                React-based email templates
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                Create and preview email templates with a React-based email
                library.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-foreground/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
        </div>
      </div>
    </div>
  </div>
);
