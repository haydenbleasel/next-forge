import Image from 'next/image';
import Link from 'next/link';
import { allBlogs } from '@contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/container';
import type { FC } from 'react';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata = createMetadata({ title, description, path: '/blog' });

const Blog: FC = () => (
  <main className="relative py-16">
    <Container>
      <div className="flex flex-col gap-1">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <span className="mt-2 max-w-[750px] text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          {description}
        </span>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-8">
        {allBlogs.map((post) => (
          <Link href={post.slug} key={post.slug}>
            <Card className="overflow-hidden flex flex-col justify-between divide-y divide-zinc-200 dark:divide-zinc-800">
              {post.image ? (
                <Image
                  src={post.image}
                  width={685}
                  height={685}
                  sizes="(max-width: 768px) 685px, (max-width: 1200px) 558px, 434px"
                  placeholder={`data:image/jpg;base64,${post.imageBlur}`}
                  alt=""
                />
              ) : null}
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  </main>
);

export default Blog;
