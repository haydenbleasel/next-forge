import { getTableOfContents } from 'fumadocs-core/server';
import type { ReactElement } from 'react';

type SidebarProperties = {
  readonly date: Date;
  readonly readingTime: string;
  readonly tags?: string[];
  readonly content: string;
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const capitalize = (tag: string) => {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};

export const Sidebar = async ({
  date,
  readingTime,
  tags,
  content,
}: SidebarProperties): Promise<ReactElement> => {
  const toc = await getTableOfContents(content);

  return (
    <div className="col-span-4 flex w-72 flex-col items-start gap-8 border-foreground/10 border-l px-6 lg:col-span-2">
      <div className="grid gap-2">
        <p className="text-muted-foreground text-sm">Published</p>
        <p className="rounded-sm text-foreground text-sm">{formatDate(date)}</p>
      </div>
      <div className="grid gap-2">
        <p className="text-muted-foreground text-sm">Reading Time</p>
        <p className="rounded-sm text-foreground text-sm">{readingTime}</p>
      </div>
      {tags && (
        <div className="grid gap-2">
          <p className="text-muted-foreground text-sm">Tags</p>
          <p className="rounded-sm text-foreground text-sm">
            {tags?.map(capitalize).join(', ')}
          </p>
        </div>
      )}
      {toc.length > 0 ? (
        <div className="-mx-2">
          <div className="grid gap-2 p-2">
            <p className="text-muted-foreground text-sm">Sections</p>
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
                    className="line-clamp-3 flex rounded-sm text-foreground text-sm underline decoration-foreground/0 transition-colors hover:decoration-foreground/50"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : undefined}
    </div>
  );
};
