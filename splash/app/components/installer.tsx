'use client';

import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

const command = 'npx next-forge@latest init [my-project]';

export const Installer = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="dark inline-flex h-10 items-center justify-center gap-3 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-4 py-2 font-medium text-neutral-950 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
      <p className="pointer-events-none select-none text-neutral-500 dark:text-neutral-400">
        $
      </p>
      <div className="max-w-[300px] truncate font-mono">{command}</div>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Copy" onClick={handleCopy}>
          <CopyIcon
            size={14}
            className="text-neutral-500 dark:text-neutral-400"
          />
        </button>
      </div>
    </div>
  );
};
