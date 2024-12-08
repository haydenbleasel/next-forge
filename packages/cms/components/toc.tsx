import { Body } from './body';

type TableOfContentsProperties = {
  readonly data: object;
};

export const TableOfContents = ({ data }: TableOfContentsProperties) => (
  <div>
    <Body
      blocks={data}
      components={{
        ol: (props) => (
          <ol className="flex list-none flex-col gap-2 text-sm" {...props} />
        ),
        li: ({ children }) => <li className="pl-3">{children}</li>,
        a: (props) => (
          <a
            className="line-clamp-3 flex rounded-sm text-foreground text-sm underline decoration-foreground/0 transition-colors hover:decoration-foreground/50"
            {...props}
          />
        ),
      }}
    />
  </div>
);
