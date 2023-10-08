export const parseError = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);

  return message;
};
