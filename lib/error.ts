import { toast } from '@beskar-labs/gravity/toast';

export const parseError = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);

  return message;
};

export const handleError = (error: unknown): void => {
  const message = parseError(error);

  toast.error(message);
};
