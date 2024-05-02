import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import type { Heading } from 'mdast';
import type { Parent } from 'unist';
import type { VFile } from 'vfile';

const slugger = new GithubSlugger();

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

export type Toc = TocItem[];

/**
 * Extracts TOC headings from markdown file and adds it to the file's data object.
 */
export const remarkTocHeadings = (tree: Parent, file: VFile): void => {
  const toc: Toc = [];
  visit(tree, 'heading', (node: Heading) => {
    const textContent = toString(node);
    toc.push({
      value: textContent,
      url: `#${slugger.slug(textContent)}`,
      depth: node.depth,
    });
  });
  file.data.toc = toc;
};

/**
 * Passes markdown file through remark to extract TOC headings
 *
 * @param {string} markdown
 * @return {*}  {Promise<Toc>}
 */
export const extractTocHeadings = async (markdown: string): Promise<Toc> => {
  // @ts-expect-error - idk
  const vfile = await remark().use(remarkTocHeadings).process(markdown);
  // @ts-expect-error - vfile data is not typed
  return vfile.data.toc;
};
