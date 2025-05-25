import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        collapsible: false,
        tabs: [
          {
            title: 'Getting Started',
            url: '/docs',
          },
          {
            title: 'Apps',
            url: '/apps',
          },
          {
            title: 'Packages',
            url: '/packages',
          },
          {
            title: 'Migrations',
            url: '/migrations',
          },
          {
            title: 'Addons',
            url: '/addons',
          },
        ],
      }}
      tabMode="navbar"
      nav={{
        ...baseOptions.nav,
        mode: 'top',
      }}
    >
      {children}
    </DocsLayout>
  );
}
