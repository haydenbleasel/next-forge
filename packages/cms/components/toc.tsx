type TableOfContentsProperties = {
  readonly toc: object;
};

export const TableOfContents = ({ toc }: TableOfContentsProperties) => (
  <div>
    <pre>{JSON.stringify(toc, null, 2)}</pre>
    {/* <ul className="flex list-none flex-col gap-2 text-sm">
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
    </ul> */}
  </div>
);
