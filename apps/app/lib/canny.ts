import 'server-only';
import jwt from 'jsonwebtoken';
import type { User } from '@clerk/nextjs/dist/types/server';

export type ChangelogEntries = {
  hasMore: boolean;
  entries: {
    id: string;
    created: string;
    labels: {
      id: string;
      created: string;
      entryCount: number;
      name: string;
      url: string;
    }[];
    lastSaved: string;
    markdownDetails: string;
    plaintextDetails: string;
    posts: {
      category: {
        id: string;
        name: string;
        postCount: number;
        url: string;
      };
      commentCount: number;
      eta: string;
      id: string;
      imageURLs: unknown[];
      jira: {
        linkedIssues: {
          id: string;
          key: string;
          url: string;
        }[];
      };
      score: number;
      status: string;
      tags: {
        id: string;
        name: string;
        postCount: number;
        url: string;
      }[];
      title: string;
      url: string;
    }[];
    publishedAt: string;
    reactions: {
      like: number;
    };
    scheduledFor: unknown;
    status: string;
    title: string;
    types: string[];
    url: string;
  }[];
};

export const generateSsoToken = (user: User): string => {
  const userData = {
    avatar: user.imageUrl,
    email: user.emailAddresses.at(0)?.emailAddress,
    id: user.id,
    name:
      user.firstName ??
      user.emailAddresses.at(0)?.emailAddress.split('@').at(0),
  };

  if (!process.env.CANNY_PRIVATE_KEY) {
    throw new Error('CANNY_PRIVATE_KEY is not defined');
  }

  const ssoToken = jwt.sign(userData, process.env.CANNY_PRIVATE_KEY, {
    algorithm: 'HS256',
  });

  return ssoToken;
};
