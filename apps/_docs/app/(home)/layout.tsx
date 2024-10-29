import { baseOptions } from '@/app/layout.config';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <HomeLayout
    {...baseOptions}
    links={[
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        text: 'Setup',
        url: '/docs/setup',
      },
      {
        text: 'Deploying',
        url: '/docs/deploying',
      },
    ]}
  >
    {children}
  </HomeLayout>
);

export default Layout;
