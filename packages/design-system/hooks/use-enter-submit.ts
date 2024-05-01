import { useRef } from 'react';
import type { KeyboardEvent, RefObject } from 'react';

export const useEnterSubmit = (): {
  formRef: RefObject<HTMLFormElement>;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };

  return { formRef, onKeyDown: handleKeyDown };
};
