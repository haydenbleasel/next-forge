import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { Callout } from 'fumadocs-ui/components/callout';
import {} from 'react';
import { Authors } from './components/authors';
import { VercelButton } from './components/vercel';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Authors,
    VercelButton,
    Warning: ({ children }) => <Callout type="warning">{children}</Callout>,
    Tip: ({ children }) => <Callout type="info">{children}</Callout>,
    Info: ({ children }) => <Callout type="info">{children}</Callout>,
  };
}
