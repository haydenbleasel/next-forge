import { Image } from '@repo/cms/components/image';
import { cn } from '@repo/design-system/lib/utils';
import type { Blog, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import { Pump } from 'basehub/react-pump';
import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({ title, description });

const BlogIndex = () => {
  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
              Latest articles
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Pump
              queries={[
                {
                  blog: {
                    posts: {
                      __args: {
                        first: 1,
                        orderBy: '_sys_createdAt__DESC',
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
                      },
                    },
                  },
                },
              ]}
            >
              {async ([data]) => {
                'use server';

                if (!data.blog.posts.items.length) {
                  return null;
                }

                return data.blog.posts.items.map((post, index) => (
                  <Link
                    href={`/blog/${post._slug}`}
                    className={cn(
                      'flex cursor-pointer flex-col gap-4 hover:opacity-75',
                      !index && 'md:col-span-2'
                    )}
                    key={post._slug}
                  >
                    <Image
                      src={post.image.url}
                      alt={post.image.alt ?? ''}
                      width={post.image.width}
                      height={post.image.height}
                    />
                    <div className="flex flex-row items-center gap-4">
                      <p className="text-muted-foreground text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="max-w-3xl text-4xl tracking-tight">
                        {post._title}
                      </h3>
                      <p className="max-w-3xl text-base text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ));
              }}
            </Pump>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
