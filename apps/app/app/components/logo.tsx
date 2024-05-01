import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

export const Logo: FC = () => (
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/logo.svg"
      alt=""
      width={24}
      height={24}
      className="dark:invert"
    />
    <p className="text-lg text-black dark:text-white font-semibold">
      next-forge
    </p>
  </Link>
);
