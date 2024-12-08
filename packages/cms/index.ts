import { basehub, fragmentOn } from 'basehub';

const imageFragment = fragmentOn('BlockImage', {
  url: true,
  width: true,
  height: true,
  alt: true,
  blurDataURL: true,
});

const postMetaFragment = fragmentOn('PostsItem', {
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

export const blog = {
  getPosts: async () => {
    const data = await basehub().query({
      blog: {
        posts: {
          items: postMetaFragment,
        },
      },
    });

    return data.blog.posts.items.map((post) => ({
      title: post._title,
      slug: post._slug,
      ...post,
    }));
  },

  getLatestPost: async () => {
    const data = await basehub().query({
      blog: {
        posts: {
          __args: {
            orderBy: '_sys_createdAt__DESC',
            first: 1,
          },
          items: postMetaFragment,
        },
      },
    });

    return data.blog.posts.items
      .map((post) => ({
        title: post._title,
        slug: post._slug,
        ...post,
      }))
      .at(0);
  },

  getPost: async (slug: string) => {
    const data = await basehub().query({
      blog: {
        posts: {
          __args: {
            filter: {
              _sys_slug: {
                eq: slug,
              },
            },
          },
          items: postMetaFragment,
        },
      },
    });

    return data.blog.posts.items
      .map((post) => ({
        title: post._title,
        slug: post._slug,
        ...post,
      }))
      .at(0);
  },
};

export const legal = {
  getPosts: async () => {
    const data = await basehub().query({
      legalPages: {
        items: {
          _slug: true,
        },
      },
    });

    return data.legalPages.items;
  },

  getLatestPost: async () => {
    const data = await basehub().query({
      legalPages: {
        __args: {
          orderBy: '_sys_createdAt__DESC',
          first: 1,
        },
        items: {
          _slug: true,
        },
      },
    });

    return data.legalPages.items.at(0);
  },

  getPost: async (slug: string) => {
    const data = await basehub().query({
      legalPages: {
        __args: {
          filter: {
            _sys_slug: {
              eq: slug,
            },
          },
        },
        items: {
          _slug: true,
        },
      },
    });

    return data.legalPages.items.at(0);
  },
};
