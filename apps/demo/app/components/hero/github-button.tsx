import { Octokit } from '@octokit/rest';
import type { ReactElement } from 'react';

import Image from 'next/image';
import GitHubIcon from './github.svg';

export const GitHubButton = async (): Promise<ReactElement> => {
  const octokit = new Octokit();

  const { data } = await octokit.repos.get({
    owner: 'haydenbleasel',
    // repo: 'roadmap-ui',
    repo: 'next-forge',
  });

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      href={data.html_url}
    >
      <div className="flex h-full items-center">
        <div className="flex items-center gap-2 px-4 py-2">
          <Image src={GitHubIcon} alt="GitHub" width={16} height={16} />
          <div className="hidden md:[display:unset]">GitHub</div>
        </div>
        <div className="hidden h-full w-px bg-border md:[display:unset]" />
        <div className="px-4 py-2">
          <div>{data.stargazers_count}</div>
        </div>
      </div>
    </a>
  );
};
