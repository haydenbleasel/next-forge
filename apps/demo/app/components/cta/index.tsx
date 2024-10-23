import type { FC } from 'react';
import { Installer } from '../installer';

export const CallToAction: FC = () => (
  <footer>
    <div className="relative">
      <div className="absolute inset-2 rounded-4xl bg-white/80" />
      <div className="container">
        <div className="relative pt-20 pb-16 text-center sm:py-24">
          <hgroup>
            <h2 className="font-medium text-base/7 text-muted-foreground">
              Get started
            </h2>
            <p className="mt-8 text-center font-bold text-2xl leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Ready to build something amazing?
              <br />
              Clone this repo and start building.
            </p>
          </hgroup>
          <p className="mx-auto mt-6 max-w-xs text-gray-500 text-sm/6">
            Authentication, billing, analytics, SEO, database ORM and more —
            it's all here.
          </p>
          <div className="mt-6">
            <Installer />
          </div>
        </div>
        <div className="text-gray-950 text-sm/6">
          &copy; {new Date().getFullYear()} Radiant Inc.
        </div>
      </div>
    </div>
  </footer>
);
