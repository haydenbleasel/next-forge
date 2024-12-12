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
  <div className="sticky top-0 z-50 w-full border-b bg-neutral-50/90 backdrop-blur-sm">
    <div className="container mx-auto flex items-center justify-between px-8 py-2">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={20} height={20} />
          <p className="hidden font-semibold text-lg tracking-tight sm:block">
            next-forge
          </p>
        </Link>
        <div className="hidden items-center gap-4 font-medium text-neutral-500 text-sm lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <GitHubButton className="hidden sm:block" />
        <DocsButton />
      </div>
    </div>
  </div>
);
