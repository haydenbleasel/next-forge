'use client';

import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { useCopyToClipboard } from '@repo/design-system/hooks/use-copy-to-clipboard';
import { cn } from '~/lib/utils';
import type { FC } from 'react';

const command =
  'yarn create next-app --example https://github.com/haydenbleasel/next-forge';

export const Command: FC = () => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <div className="bg-black dark:bg-zinc-900 text-white text-sm rounded-md flex overflow-hidden">
      <pre className="w-full h-full overflow-x-auto p-4">{command}</pre>
      <button
        onClick={() => copyToClipboard(command)}
        type="button"
        className={cn(
          'transition-colors shrink-0 flex items-center justify-center h-[52px] aspect-square border-l',
          'bg-zinc-900 border-zinc-800',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          !isCopied && 'hover:bg-zinc-800'
        )}
        aria-label="Copy command to clipboard"
        disabled={isCopied}
      >
        <Icon className="w-4 h-4" />
      </button>
    </div>
  );
};
