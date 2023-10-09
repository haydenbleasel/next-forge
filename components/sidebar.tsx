import { twMerge } from 'tailwind-merge';
import { formatDate } from '@/lib/format';
import TableOfContents from './tableOfContents';
import type { FC } from 'react';
import type { Blog, Legal } from '@/.contentlayer/generated';
import type { Toc } from 'contentlayer-datapad';

type SidebarProps = {
  readonly doc: Blog | Legal;
};

export const Sidebar: FC<SidebarProps> = ({ doc }) => (
  <div
    className={twMerge(
      'col-span-4 flex w-72 flex-col items-start gap-8 border-l px-6 lg:col-span-2',
      'border-white/10'
    )}
  >
    <div className="grid gap-2">
      <p className="text-sm text-neutral-500">Published</p>
      <p className="rounded-sm text-sm text-black dark:text-white">
        {formatDate(new Date(doc.date))}
      </p>
    </div>
    <div className="grid gap-2">
      <p className="text-sm text-neutral-500">Reading Time</p>
      <p className="rounded-sm text-sm text-black dark:text-white">
        {doc.readingTime}
      </p>
    </div>
    <div className="-mx-2">
      <TableOfContents toc={doc.toc as Toc} />
    </div>
  </div>
);
