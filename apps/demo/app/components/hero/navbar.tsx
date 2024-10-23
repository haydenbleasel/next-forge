import { GitHubIcon, TwitterIcon } from '@/app/components/icons';
import { Logo } from '@/app/components/logo';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import {
  CalendarRangeIcon,
  KanbanSquareIcon,
  ListIcon,
  SquareChartGanttIcon,
  TablePropertiesIcon,
} from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { ModeToggle } from './mode-toggle';

const _DocsLink: FC<{
  href: string;
  icon: typeof SquareChartGanttIcon;
  title: string;
}> = ({ href, icon: Icon, title }) => (
  <Tooltip delayDuration={0}>
    <TooltipTrigger>
      <Link
        href={href}
        className="flex aspect-square h-7 items-center justify-center rounded transition-all hover:bg-background hover:text-primary hover:shadow-sm"
      >
        <Icon size={16} />
        <span className="sr-only">{title}</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent side="bottom" align="center" sideOffset={4}>
      <p className="text-xs">{title}</p>
    </TooltipContent>
  </Tooltip>
);

const _docsLinks = [
  { href: '/docs/gantt', icon: SquareChartGanttIcon, title: 'Gantt' },
  { href: '/docs/kanban', icon: KanbanSquareIcon, title: 'Kanban' },
  { href: '/docs/calendar', icon: CalendarRangeIcon, title: 'Calendar' },
  { href: '/docs/list', icon: ListIcon, title: 'List' },
  { href: '/docs/table', icon: TablePropertiesIcon, title: 'Table' },
];

export const Navbar: FC = () => (
  <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
      <nav className="flex items-center gap-6">
        <Link href="/">
          <Logo />
        </Link>

        {/* <Link href="/docs" className="text-sm font-medium">
          Docs
        </Link>

        <div className="flex items-center gap-px rounded-md bg-secondary p-0.5 text-muted-foreground">
          {docsLinks.map(({ href, icon, title }) => (
            <DocsLink key={href} href={href} icon={icon} title={title} />
          ))}
        </div> */}
      </nav>
      <div className="flex flex-1 items-center gap-2 md:justify-end">
        <div className="flex items-center gap-px">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://x.com/haydenbleasel"
          >
            <div className="inline-flex h-10 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <TwitterIcon className="h-4 w-4" />
              <span className="sr-only">X</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/haydenbleasel/roadmap-ui"
          >
            <div className="inline-flex h-10 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <GitHubIcon className="h-4 w-4" />
              <span className="sr-only">X</span>
            </div>
          </a>
        </div>
        <ModeToggle />
      </div>
    </div>
  </header>
);
