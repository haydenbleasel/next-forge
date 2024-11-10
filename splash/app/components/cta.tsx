import { Installer } from './installer';

export const CallToAction = () => (
  <footer>
    <div className="relative">
      <div className="container mx-auto">
        <div className="relative pt-20 pb-16 text-center sm:py-24">
          <div>
            <h2 className="font-medium text-base/7 text-neutral-500 dark:text-neutral-400">
              Get started
            </h2>
            <p className="mt-8 text-center font-bold text-2xl text-neutral-950 leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] dark:text-white">
              Ready to build something amazing?
              <br />
              Clone this repo and start building.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-xs text-neutral-500 text-sm/6 dark:text-neutral-400">
            Authentication, billing, analytics, SEO, database ORM and more —
            it's all here.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Installer />
            <a
              href="https://docs.next-forge.com/"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-orange-600"
            >
              Read the docs
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
