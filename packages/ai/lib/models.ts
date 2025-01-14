import { provider } from './provider';

export const models = {
  chat: provider('gpt-4o-mini'),
  embeddings: provider('text-embedding-3-small'),
};
