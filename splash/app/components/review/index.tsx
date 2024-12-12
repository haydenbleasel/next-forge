import { MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import rauchg from './rauchg.jpg';
import vercel from './vercel.jpg';
import x from './x.svg';

export const Review = () => (
  <section className="flex flex-col gap-8 p-8">
    <div className="flex items-center gap-2 text-neutral-500">
      <MessageCircleIcon size={14} />
      <small>Nice words</small>
    </div>
    <p className="font-semibold text-xl tracking-tight sm:text-2xl">
      <Balancer>
        &ldquo;A production-grade, monorepo-first, full stack Next.js template.
        Very thoughtfully engineered and documented. Covers auth, DB & ORM,
        payments, docs, blog, o11y, analytics, emails, and even feature flags &
        dark mode.&rdquo;
      </Balancer>
    </p>
    <div className="space-between flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="-space-x-1 flex items-center">
          <Image
            src={rauchg}
            alt=""
            width={24}
            height={24}
            className="rounded-full ring-2 ring-white"
          />
          <Image
            src={vercel}
            alt=""
            width={24}
            height={24}
            className="rounded-full ring-2 ring-white"
          />
        </div>
        <p className="text-neutral-500 text-sm">
          <span className="font-medium">Guillermo Rauch</span>, CEO of Vercel
        </p>
      </div>
      <a
        href="https://x.com/rauchg/status/1853171412766466119"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={x} alt="" width={16} height={16} />
      </a>
    </div>
  </section>
);
