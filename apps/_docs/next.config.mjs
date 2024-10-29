import { createMDX } from 'fumadocs-mdx/next';

const withMdx = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withMdx(config);
