/*
 * Inspired by Chatbot-UI and modified to fit the needs of this project
 * @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx
 */

'use client';

import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CheckIcon, CopyIcon, DownloadIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard';
import type { FC } from 'react';

type Props = {
  language: string;
  code: string;
};

type languageMap = Record<string, string | undefined>;

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css',
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (
  length: number,
  lowercase = false
): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

export const CodeBlock: FC<Props> = memo(({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(
      3,
      true
    )}${fileExtension}`;
    const fileName = window.prompt('Enter file name' || '', suggestedFileName);

    if (!fileName) {
      // User pressed cancel on prompt.
      return;
    }

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative w-full bg-gray-950 divide-y divide-gray-700">
      <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-gray-950 text-gray-100">
        <span className="text-sm">{language}</span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={downloadAsFile}
            size="icon"
          >
            <DownloadIcon size={16} />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-xs focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={() => copyToClipboard(code)}
          >
            {isCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={nord}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem',
          borderRadius: 0,
        }}
        lineNumberStyle={{
          userSelect: 'none',
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-geist-mono)',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';
