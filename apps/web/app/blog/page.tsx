import { Badge } from '@repo/design-system/components/ui/badge';
import { createMetadata } from '@repo/design-system/lib/metadata';
import { cn } from '@repo/design-system/lib/utils';
import { allPosts } from 'content-collections';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({ title, description });

const Blog: FC = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto flex flex-col gap-14">
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
          Latest articles
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allPosts.map((post, index) => (
          <Link
            href={`/blog/${post._meta.path}`}
            className={cn(
              'flex flex-col gap-4 hover:opacity-75 cursor-pointer',
              !index && 'md:col-span-2'
            )}
            key={post.title}
          >
            <Image
              src={post.image}
              alt={post.title}
              width={1336}
              height={751}
            />
            <div className="flex flex-row gap-4 items-center">
              <Badge>{post.date}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="max-w-3xl text-4xl tracking-tight">
                {post.title}
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
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
