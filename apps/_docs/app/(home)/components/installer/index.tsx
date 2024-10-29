'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { CopyIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { toast } from 'sonner';
import BunLogo from './bun.svg';
import NpmLogo from './npm.svg';
import PnpmLogo from './pnpm.svg';
import YarnLogo from './yarn.svg';

const installers = [
  {
    value: 'pnpm',
    command: 'pnpm create next-app',
    logo: PnpmLogo,
    name: 'pnpm',
  },
  { value: 'bun', command: 'bun create next-app', logo: BunLogo, name: 'Bun' },
  {
    value: 'npm',
    command: 'npx create-next-app',
    logo: NpmLogo,
    name: 'npm',
  },
  {
    value: 'yarn',
    command: 'yarn create next-app',
    logo: YarnLogo,
    name: 'Yarn',
  },
];

const installCommand =
  '@latest --example https://github.com/haydenbleasel/next-forge';

export const Installer = () => {
  const [manager, setManager] = useState(installers[0].value);
  const activeManager = installers.find(
    (installer) => installer.value === manager
  );

  if (!activeManager) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeManager.command}${installCommand}`);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={activeManager.logo}
            width={16}
            height={16}
            alt=""
            className="m-0 h-4 w-4 object-contain"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-32"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={12}
        >
          <DropdownMenuGroup>
            {installers.map((installer) => (
              <DropdownMenuItem
                key={installer.value}
                onClick={() => setManager(installer.value)}
                className="flex items-center gap-2"
              >
                <Image src={installer.logo} width={16} height={16} alt="" />
                {installer.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="max-w-[220px] truncate text-muted-foreground">
        {activeManager.command}
        <span className="text-foreground">{installCommand}</span>
      </div>
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
  );
};
