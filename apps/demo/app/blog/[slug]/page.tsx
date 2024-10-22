import { notFound } from 'next/navigation';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import Image from 'next/image';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { createMetadata } from '@repo/design-system/lib/metadata';
import { Container } from '@repo/design-system/components/container';
import { allBlogs } from '@contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { Sidebar } from '@/components/sidebar';
import type { FC } from 'react';
import type { Metadata } from 'next';

type BlogPostProperties = {
  readonly params: {
    slug: string;
  };
};

export const dynamic = 'force-dynamic';

export const generateMetadata = ({ params }: BlogPostProperties): Metadata => {
  const currentPath = params.slug;
  const page = allBlogs.find(
    ({ slugAsParams }) => slugAsParams === currentPath
  );

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: page.image,
  });
};

export const generateStaticParams = (): BlogPostProperties['params'][] =>
  allBlogs.map((page) => ({
    slug: page.slug,
  }));

const BlogPost: FC<BlogPostProperties> = ({ params }) => {
  const currentPath = params.slug;
  const page = allBlogs.find(
    ({ slugAsParams }) => slugAsParams === currentPath
  );

  if (!page) {
    notFound();
  }

  return (
    <Container className="py-16">
      <Link
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-600 focus:text-zinc-600 focus:underline focus:outline-none"
        href="/blog"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Blog
      </Link>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <Balancer>{page.title}</Balancer>
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <Balancer>{page.description}</Balancer>
      </p>
      {page.image && page.imageBlur ? (
        <Image
          src={page.image}
          width={1920}
          height={1080}
          alt=""
          className="h-full w-full rounded-xl my-16"
          priority
          blurDataURL={page.imageBlur}
          placeholder="blur"
        />
      ) : undefined}
      <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
        <div className="sm:flex-1">
          <div className="prose prose-zinc dark:prose-invert">
            <Mdx code={page.body.code} />
          </div>
        </div>
        <div className="sticky top-24 hidden shrink-0 md:block">
          <Sidebar doc={page} />
        </div>
      </div>
    </Container>
  );
};

export default BlogPost;
