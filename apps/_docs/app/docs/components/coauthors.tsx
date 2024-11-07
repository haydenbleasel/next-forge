import Image from 'next/image';

type CoauthorsProps = {
  authors: {
    name: string;
    company: string;
    avatar: string;
    logo: string;
  }[];
};

export const Coauthors = ({ authors }: CoauthorsProps) => (
  <div className="-mt-8 mb-16 flex flex-col gap-2">
    <span className="text-muted-foreground text-sm">Co-authored by</span>
    <div className="flex flex-wrap items-center gap-2">
      {authors.map((author) => (
        <div
          key={author.name}
          className="flex items-center gap-2 rounded-full bg-foreground/5 py-1.5 pr-4 pl-2 text-xs backdrop-blur-sm"
        >
          <div className="-space-x-1 flex items-center">
            <Image
              className="m-0 overflow-hidden rounded-full object-cover"
              src={author.avatar}
              alt={author.name}
              width={24}
              height={24}
            />
            <Image
              className="m-0 overflow-hidden rounded-full object-cover"
              src={`https://img.logo.dev/${new URL(author.logo).hostname}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}`}
              alt={author.name}
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col">
            <span>{author.name}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              {author.company}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
