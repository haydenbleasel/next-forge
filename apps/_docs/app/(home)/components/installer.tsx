'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

const command = 'npx next-forge init [my-project]';

export const Installer = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <div className="max-w-[300px] truncate font-mono">{command}</div>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Copy"
              className="ml-2 h-4 w-4"
              onClick={handleCopy}
            >
              <CopyIcon size={14} className="text-muted-foreground" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
