import { twMerge } from 'tailwind-merge';
import type { Toc } from 'contentlayer-datapad';
import type { FC } from 'react';

const TableOfContents: FC<{ readonly toc: Toc }> = ({ toc }) => {
  if (!toc.length) {
    return null;
  }

  return (
    <div className="grid gap-2 p-2">
      <p className="text-sm text-neutral-500">Sections</p>
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
  );
};

export default TableOfContents;
