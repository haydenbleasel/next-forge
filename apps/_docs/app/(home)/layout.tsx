import { baseOptions } from '@/app/layout.config';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <HomeLayout {...baseOptions}>{children}</HomeLayout>
);

export default Layout;
