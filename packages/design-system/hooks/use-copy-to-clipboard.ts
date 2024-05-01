'use client';

import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { toast } from 'sonner';

export const useCopyToClipboard = (): {
  isCopied: boolean;
  copyToClipboard: (value: string) => void;
} => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (isCopied) {
      return;
    }

    copy(value);
    setIsCopied(true);
    toast.success('Copied to clipboard!');

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return { isCopied, copyToClipboard };
};
