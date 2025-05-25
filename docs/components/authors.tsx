import Image from 'next/image';

type Author = {
  company: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
};

export const Authors = ({ data }: { data: Author[] }) => (
  <div className="mb-12 flex flex-col gap-2">
    <span className="text-gray-500 text-sm">Co-authored by</span>
    <div className="flex flex-wrap items-center gap-2">
      {data.map((author) => (
        <div
          key={author.user.id}
          className="relative inline-flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3 pr-4 font-normal"
        >
          <div className="relative">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-200">
              <Image
                className="m-0 h-full w-full object-cover"
                src={`/images/authors/${author.company.id}/${author.user.id}.jpg`}
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div className="-bottom-1 -right-1 absolute h-4 w-4 overflow-hidden rounded-full border border-white object-cover">
              <Image
                className="m-0 h-full w-full object-cover"
                src={`/images/authors/${author.company.id}/logo.jpg`}
                alt=""
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] leading-tight tracking-tight">
              {author.user.name}
            </span>
            <span className="text-[11px] text-gray-500 leading-tight">
              {author.company.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
