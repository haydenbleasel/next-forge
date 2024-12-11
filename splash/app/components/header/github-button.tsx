import Image from 'next/image';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { octokit } from '../../lib/octokit';
import GitHub from './github.svg';

type GitHubButtonProps = {
  className?: string;
};

export const GitHubButton = async ({
  className,
}: GitHubButtonProps): Promise<ReactElement> => {
  let stars = 0;
  let url = '';

  try {
    const { data } = await octokit.repos.get({
      owner: 'haydenbleasel',
      repo: 'next-forge',
    });
    stars = data.stargazers_count;
    url = data.html_url;
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: "it's fine"
    console.error(error);
  }

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={twMerge(
        'group relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border bg-white font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      href={url}
    >
      <div className="flex h-full items-center">
        <div className="flex items-center gap-2 px-4 py-2">
          <Image src={GitHub} alt="GitHub" width={16} height={16} />
          <div className="hidden sm:block">GitHub</div>
        </div>
        <div className="h-full w-px bg-neutral-200" />
        <div className="px-4 py-2">
          <div>{stars}</div>
        </div>
      </div>
    </a>
  );
};
