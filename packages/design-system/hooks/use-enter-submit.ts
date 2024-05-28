import { useRef } from 'react';
import type { KeyboardEvent, RefObject } from 'react';

export const useEnterSubmit = (): {
  formRef: RefObject<HTMLFormElement>;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} => {
  const formReference = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formReference.current?.requestSubmit();
      event.preventDefault();
    }
  };

  return { formRef: formReference, onKeyDown: handleKeyDown };
};
