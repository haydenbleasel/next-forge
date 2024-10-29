import { createMetadata } from '@repo/design-system/lib/metadata';
import { cn } from '@repo/design-system/lib/utils';
import { allPosts } from 'content-collections';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({ title, description });

const Blog = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto flex flex-col gap-14">
      <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
          Latest articles
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {allPosts.map((post, index) => (
          <Link
            href={`/blog/${post._meta.path}`}
            className={cn(
              'flex cursor-pointer flex-col gap-4 hover:opacity-75',
              !index && 'md:col-span-2'
            )}
            key={post.title}
          >
            <Image
              src={post.image}
              alt={post.title}
              width={1336}
              height={751}
              blurDataURL={post.imageBlur}
              placeholder="blur"
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
                {post.title}
              </h3>
              <p className="max-w-3xl text-base text-muted-foreground">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
