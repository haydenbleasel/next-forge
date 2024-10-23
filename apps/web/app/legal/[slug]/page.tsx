import { Mdx } from '@/components/mdx';
import { Sidebar } from '@/components/sidebar';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Container } from '@repo/design-system/components/container';
import { createMetadata } from '@repo/design-system/lib/metadata';
import { allLegals } from 'content-collections';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import Balancer from 'react-wrap-balancer';

type LegalPageProperties = {
  readonly params: {
    slug: string;
  };
};

export const dynamic = 'force-dynamic';

export const generateMetadata = ({ params }: LegalPageProperties): Metadata => {
  const currentPath = params.slug;
  const page = allLegals.find(({ _meta }) => _meta.path === currentPath);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
  });
};

export const generateStaticParams = (): LegalPageProperties['params'][] =>
  allLegals.map((page) => ({
    slug: page._meta.path,
  }));

const LegalPage: FC<LegalPageProperties> = ({ params }) => {
  const currentPath = params.slug;
  const page = allLegals.find(({ _meta }) => _meta.path === currentPath);

  if (!page) {
    notFound();
  }

  return (
    <Container className="max-w-5xl py-16">
      <Link
        className="mb-4 inline-flex items-center gap-1 text-sm text-white/50 decoration-white/30 transition-colors hover:text-white/70 focus:text-white focus:underline focus:outline-none"
        href="/blog"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Blog
      </Link>
      <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
        <Balancer>{page.title}</Balancer>
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <Balancer>{page.description}</Balancer>
      </p>
      <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
        <div className="sm:flex-1">
          <div className="prose prose-zinc dark:prose-invert">
            <Mdx code={page.content} />
          </div>
        </div>
        <div className="sticky top-24 hidden shrink-0 md:block">
          <Sidebar doc={page} />
        </div>
      </div>
    </Container>
  );
};

export default LegalPage;
