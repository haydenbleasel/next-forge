import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { Mask } from './components/mask';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      <Mask />
      {children}
    </DocsLayout>
  );
}
