import { Sidebar } from '@/components/sidebar';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { legal } from '@repo/cms';
import { Body } from '@repo/cms/components/body';
import { Feed } from '@repo/cms/components/feed';
import { TableOfContents } from '@repo/cms/components/toc';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type LegalPageProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: LegalPageProperties): Promise<Metadata> => {
  const { slug } = await params;
  const post = await legal.getPost(slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post._title,
    description: post.description,
  });
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await legal.getPosts();

  return posts.map(({ _slug }) => ({ slug: _slug }));
};

const LegalPage = async ({ params }: LegalPageProperties) => {
  const { slug } = await params;
  const draft = await draftMode();

  return (
    <Feed queries={[legal.postQuery(slug)]} draft={draft.isEnabled}>
      {/* biome-ignore lint/suspicious/useAwait: "Server Actions must be async" */}
      {async ([data]) => {
        'use server';

        const [page] = data.legalPages.items;

        if (!page) {
          notFound();
        }

        return (
          <div className="container max-w-5xl py-16">
            <Link
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/50 decoration-white/30 transition-colors hover:text-white/70 focus:text-white focus:underline focus:outline-none"
              href="/blog"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Blog
            </Link>
            <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
              <Balancer>{page._title}</Balancer>
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              <Balancer>{page.description}</Balancer>
            </p>
            <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
              <div className="sm:flex-1">
                <div className="prose prose-neutral dark:prose-invert">
                  <Body content={page.body.json.content} />
                </div>
              </div>
              <div className="sticky top-24 hidden shrink-0 md:block">
                <Sidebar
                  toc={<TableOfContents data={page.body.json.toc} />}
                  readingTime={`${page.body.readingTime} min read`}
                  date={new Date()}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Feed>
  );
};

export default LegalPage;
