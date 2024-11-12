import { Octokit } from '@octokit/rest';
import { ArrowUpRightIcon, GitForkIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import GitHubIcon from './github.svg';
import xIcon from './x.svg';

export const RepoInfo = async () => {
  const octokit = new Octokit();

  const { data } = await octokit.repos.get({
    owner: 'haydenbleasel',
    repo: 'next-forge',
  });

  return (
    <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm sm:flex-row sm:gap-6">
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
      <a
        className="flex items-center gap-1"
        target="_blank"
        rel="noreferrer"
        href="https://x.com/haydenbleasel"
      >
        <Image
          src={xIcon}
          alt="X"
          width={16}
          height={16}
          className="opacity-60 dark:invert"
        />
        By @haydenbleasel <ArrowUpRightIcon size={12} />
      </a>
    </div>
  );
};
