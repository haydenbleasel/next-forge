import { twMerge } from 'tailwind-merge';
import { formatDate } from '@/lib/format';
import type { FC } from 'react';
import type { Blog, Legal } from '@/.contentlayer/generated';
import type { Toc } from 'contentlayer-datapad';

type SidebarProps = {
  readonly doc: Blog | Legal;
};

export const Sidebar: FC<SidebarProps> = ({ doc }) => {
  const toc = doc.toc as Toc;

  return (
    <div
      className={twMerge(
        'col-span-4 flex w-72 flex-col items-start gap-8 border-l px-6 lg:col-span-2',
        'border-white/10'
      )}
    >
      <div className="grid gap-2">
        <p className="text-sm text-zinc-500">Published</p>
        <p className="rounded-sm text-sm text-black dark:text-white">
          {formatDate(new Date(doc.date))}
        </p>
      </div>
      <div className="grid gap-2">
        <p className="text-sm text-zinc-500">Reading Time</p>
        <p className="rounded-sm text-sm text-black dark:text-white">
          {doc.readingTime}
        </p>
      </div>
      {toc.length ? (
        <div className="-mx-2">
          <div className="grid gap-2 p-2">
            <p className="text-sm text-zinc-500">Sections</p>
            <ul className="flex list-none flex-col gap-2 text-sm">
              {toc.map((item) => (
                <li
                  key={item.url}
                  style={{
                    paddingLeft: `${item.depth - 2}rem`,
                  }}
                >
                  <a
                    href={item.url}
                    className={twMerge(
                      'flex rounded-sm text-sm underline decoration-white/0 transition-colors hover:decoration-white/50',
                      'line-clamp-3 text-white'
                    )}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};
