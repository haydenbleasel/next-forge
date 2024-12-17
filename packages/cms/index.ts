import { basehub as basehubClient, fragmentOn } from 'basehub';
import { keys } from './keys';

const basehub = basehubClient({
  token: keys().BASEHUB_TOKEN,
});

const imageFragment = fragmentOn('BlockImage', {
  url: true,
  width: true,
  height: true,
  alt: true,
  blurDataURL: true,
});

const postFragment = fragmentOn('PostsItem', {
  _slug: true,
  _title: true,
  authors: {
    _title: true,
    avatar: imageFragment,
    xUrl: true,
  },
  body: {
    plainText: true,
    json: {
      content: true,
      toc: true,
    },
    readingTime: true,
  },
  categories: {
    _title: true,
  },
  date: true,
  description: true,
  image: imageFragment,
});

const legalPostFragment = fragmentOn('LegalPagesItem', {
  _slug: true,
  _title: true,
  body: {
    plainText: true,
    json: {
      content: true,
      toc: true,
    },
    readingTime: true,
  },
  description: true,
});

export const blog = {
  postsQuery: {
    blog: {
      posts: {
        items: postFragment,
      },
    },
  } as const,

  latestPostQuery: {
    blog: {
      posts: {
        __args: {
          orderBy: '_sys_createdAt__DESC',
          first: 1,
        },
        items: postFragment,
      },
    },
  } as const,

  postQuery: (slug: string) => ({
    blog: {
      posts: {
        __args: {
          filter: {
            _sys_slug: { eq: slug },
          },
        },
        items: postFragment,
      },
    },
  }),

  getPosts: async () => {
    const data = await basehub.query(blog.postsQuery);

    return data.blog.posts.items;
  },

  getLatestPost: async () => {
    const data = await basehub.query(blog.latestPostQuery);

    return data.blog.posts.items.at(0);
  },

  getPost: async (slug: string) => {
    const query = blog.postQuery(slug);
    const data = await basehub.query(query);

    return data.blog.posts.items.at(0);
  },
};

export const legal = {
  postsQuery: {
    legalPages: {
      items: legalPostFragment,
    },
  } as const,

  latestPostQuery: {
    legalPages: {
      __args: {
        orderBy: '_sys_createdAt__DESC',
        first: 1,
      },
      items: legalPostFragment,
    },
  } as const,

  postQuery: (slug: string) => ({
    legalPages: {
      __args: {
        filter: {
          _sys_slug: { eq: slug },
        },
      },
      items: legalPostFragment,
    },
  }),

  getPosts: async () => {
    const data = await basehub.query(legal.postsQuery);

    return data.legalPages.items;
  },

  getLatestPost: async () => {
    const data = await basehub.query(legal.latestPostQuery);

    return data.legalPages.items.at(0);
  },

  getPost: async (slug: string) => {
    const query = legal.postQuery(slug);
    const data = await basehub.query(query);

    return data.legalPages.items.at(0);
  },
};
