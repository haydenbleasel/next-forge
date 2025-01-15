import Fuse from 'fuse.js';

export const createSearch = <T>(data: readonly T[], keys: string[]): Fuse<T> =>
  new Fuse(data, {
    keys,
    minMatchCharLength: 1,
    threshold: 0.3,
  });
