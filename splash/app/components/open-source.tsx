import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { octokit } from '../lib/octokit';

export const OpenSource = async () => {
  const { data } = await octokit.repos.get({
    owner: 'haydenbleasel',
    repo: 'next-forge',
  });
  const { data: contributors } = await octokit.repos.listContributors({
    owner: 'haydenbleasel',
    repo: 'next-forge',
    anon: 'true',
    per_page: 100,
  });

  return (
    <div className="flex h-full flex-col items-start justify-between gap-4 p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-neutral-500">
          <StarIcon size={14} />
          <small>Open source</small>
        </div>
        <p className="font-semibold text-xl tracking-tight">
          next-forge currently has{' '}
          <span className="text-orange-600">{data.stargazers_count}</span>{' '}
          stars, <span className="text-orange-600">{data.forks_count}</span>{' '}
          forks, and{' '}
          <span className="text-orange-600">{data.open_issues_count}</span> open
          issues and{' '}
          <span className="text-orange-600">{contributors.length}</span>{' '}
          contributors.
        </p>
        <div className="-space-x-1 flex flex-row">
          {contributors
            .filter((contributor) => contributor.avatar_url)
            .slice(0, 10)
            .map((contributor) => (
              <Image
                key={contributor.id}
                src={contributor.avatar_url as string}
                alt={contributor.login ?? ''}
                width={28}
                height={28}
                className="rounded-full object-cover ring-2 ring-white"
              />
            ))}
        </div>
      </div>
      <a
        href="https://github.com/haydenbleasel/next-forge"
        className="inline-flex rounded-md border bg-white px-4 py-2 font-medium text-sm shadow-sm"
      >
        Browse the source code
      </a>
    </div>
  );
};
