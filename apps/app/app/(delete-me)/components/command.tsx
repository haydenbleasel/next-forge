'use client';

import { CopyIcon } from '@radix-ui/react-icons';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';
import type { FC } from 'react';

const command =
  'yarn create next-app --example https://github.com/haydenbleasel/next-forge';

export const Command: FC = () => {
  const copyCommand = () => {
    copy(command);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="bg-black dark:bg-zinc-900 text-white text-sm rounded-md flex overflow-hidden">
      <pre className="w-full h-full overflow-x-auto p-4">{command}</pre>
      <button
        onClick={copyCommand}
        type="button"
        className="bg-zinc-900 hover:bg-zinc-800 transition-colors shrink-0 flex items-center justify-center h-[52px] aspect-square border-l border-zinc-800"
        aria-label="Copy command to clipboard"
      >
        <CopyIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
