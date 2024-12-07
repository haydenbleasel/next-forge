import { DocsButton } from './docs-button';
import { Installer } from './installer';

export const CallToAction = () => (
  <footer className="border-neutral-200 border-t bg-neutral-50">
    <div className="relative">
      <div className="container mx-auto px-4">
        <div className="relative pt-20 pb-16 text-center sm:py-24">
          <div>
            <h2 className="font-medium text-base/7 text-neutral-500 dark:text-neutral-400">
              Get started
            </h2>
            <p className="mt-8 text-center font-bold text-2xl text-neutral-950 leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] dark:text-white">
              Ready to build something amazing?{' '}
              <br className="hidden sm:block" />
              Clone this repo and start building.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-xs text-neutral-500 text-sm/6 dark:text-neutral-400">
            Authentication, billing, analytics, SEO, database ORM and more —
            it's all here.
          </p>
          <div className="mx-auto mt-6 flex max-w-xl flex-col items-center justify-center gap-2 sm:flex-row">
            <Installer />
            <DocsButton />
          </div>
        </div>
      </div>
    </div>
  </footer>
);
