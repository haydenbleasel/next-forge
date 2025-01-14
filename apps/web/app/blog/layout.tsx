import type { ReactNode } from 'react';

type BlogLayoutProps = {
  children: ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => <>{children}</>;

export default BlogLayout;
