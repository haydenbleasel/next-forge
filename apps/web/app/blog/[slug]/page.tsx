import { Sidebar } from '@/components/sidebar';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { blog } from '@repo/cms';
import { Body } from '@repo/cms/components/body';
import { Image } from '@repo/cms/components/image';
import { env } from '@repo/env';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import { Pump } from 'basehub/react-pump';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type BlogPostProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: BlogPostProperties): Promise<Metadata> => {
  const { slug } = await params;

  const post = await blog.getPost(slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    image: post.image.url,
  });
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await blog.getPosts();

  return posts.map(({ slug }) => ({ slug }));
};

const BlogPost = async ({ params }: BlogPostProperties) => {
  const { slug } = await params;

  return (
    <Pump
      queries={[
        {
          blog: {
            posts: {
              __args: {
                filter: {
                  _sys_slug: {
                    eq: slug,
                  },
                },
              },
              items: {
                _slug: true,
                _title: true,
                description: true,
                date: true,
                image: {
                  url: true,
                  width: true,
                  height: true,
                  alt: true,
                },
                authors: {
                  _title: true,
                },
                body: {
                  json: {
                    content: true,
                    toc: true,
                  },
                  readingTime: true,
                },
              },
            },
          },
        },
      ]}
    >
      {/* biome-ignore lint/suspicious/useAwait: "Server Actions must be async" */}
      {async ([data]) => {
        'use server';

        const [page] = data.blog.posts.items;

        if (!page) {
          notFound();
        }

        return (
          <>
            <JsonLd
              code={{
                '@type': 'BlogPosting',
                '@context': 'https://schema.org',
                datePublished: page.date,
                description: page.description,
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': new URL(
                    `/blog/${slug}`,
                    env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
                  ).toString(),
                },
                headline: page._title,
                image: page.image.url,
                dateModified: page.date,
                author: page.authors.at(0)?._title,
                isAccessibleForFree: true,
              }}
            />
            <div className="container py-16">
              <Link
                className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
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
              {page.image ? (
                <Image
                  src={page.image.url}
                  width={page.image.width}
                  height={page.image.height}
                  alt={page.image.alt ?? ''}
                  className="my-16 h-full w-full rounded-xl"
                  priority
                />
              ) : undefined}
              <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
                <div className="sm:flex-1">
                  <Body content={page.body.json.content} />
                </div>
                <div className="sticky top-24 hidden shrink-0 md:block">
                  <Sidebar
                    toc={page.body.json.toc}
                    readingTime={`${page.body.readingTime} min read`}
                    date={new Date(page.date)}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Pump>
  );
};

export default BlogPost;
