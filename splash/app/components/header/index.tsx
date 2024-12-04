import Image from 'next/image';
import Link from 'next/link';
import { DocsButton } from '../docs-button';
import { GitHubButton } from './github-button';
import Logo from './logo.svg';

const links = [
  {
    label: 'Home',
    href: '/#',
  },
  {
    label: 'Apps',
    href: '/#apps',
  },
  {
    label: 'Features',
    href: '/#features',
  },
  {
    label: 'Community',
    href: '/#community',
  },
];

export const Header = () => (
  <div className="sticky top-0 z-50 w-full border-neutral-200 border-b bg-white/90 backdrop-blur-sm">
    <div className="container mx-auto flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={32}
            height={32}
            className="dark:invert"
          />
        </Link>
        <div className="hidden items-center gap-4 text-neutral-500 text-sm sm:flex dark:text-neutral-400">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <GitHubButton />
        <DocsButton />
      </div>
    </div>
  </div>
);
