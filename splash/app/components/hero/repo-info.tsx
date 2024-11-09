import { Octokit } from '@octokit/rest';
import { ArrowUpRightIcon, GitForkIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import GitHubIcon from './github.svg';

export const RepoInfo = async (): Promise<ReactElement> => {
  const octokit = new Octokit();

  const { data } = await octokit.repos.get({
    owner: 'haydenbleasel',
    repo: 'next-forge',
  });

  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <StarIcon size={12} />
        {new Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(data.stargazers_count)}{' '}
        stars
      </div>
      <div className="flex items-center gap-1">
        <GitForkIcon size={12} />
        {new Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(data.forks_count)}{' '}
        forks
      </div>
      <a
        className="flex items-center gap-1"
        target="_blank"
        rel="noreferrer"
        href={data.html_url}
      >
        <Image
          src={GitHubIcon}
          alt="GitHub"
          width={16}
          height={16}
          className="opacity-60 dark:invert"
        />
        View on GitHub <ArrowUpRightIcon size={12} />
      </a>
    </div>
  );
};
