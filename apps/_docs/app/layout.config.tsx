import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

import Logo from './(home)/components/hero/logo.svg';

export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/haydenbleasel/next-forge',
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="next-forge"
          className="dark:invert"
          width={16}
          height={16}
        />
        <span className="font-medium">next-forge</span>
      </div>
    ),
  },
};
