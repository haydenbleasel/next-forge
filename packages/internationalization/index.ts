import 'server-only';
import languine from './languine.json';

export type Dictionary = {
  web: {
    header: {
      home: string;
      product: {
        title: string;
        description: string;
        cta: string;
        items: {
          title: string;
          href: string;
        }[];
      };
      blog: string;
      docs: string;
      contact: string;
      signIn: string;
      signUp: string;
    };
    home: {
      meta: {
        title: string;
        description: string;
      };
      hero: {
        announcement: string;
        title: string;
        description: string;
        primaryCta: string;
        secondaryCta: string;
      };
      cases: {
        title: string;
      };
      features: {
        title: string;
        description: string;
        items: {
          title: string;
          description: string;
        }[];
      };
      stats: {
        title: string;
        description: string;
        items: {
          metric: number;
          description: string;
          delta: number;
        }[];
      };
      testimonials: {
        title: string;
        items: {
          title: string;
          description: string;
          author: {
            name: string;
            image: string;
          };
        }[];
      };
      faq: {
        title: string;
        description: string;
        cta: string;
        items: {
          question: string;
          answer: string;
        }[];
      };
      cta: {
        title: string;
        description: string;
        primaryCta: string;
        secondaryCta: string;
      };
    };
    blog: {
      meta: {
        title: string;
        description: string;
      };
    };
    contact: {
      meta: {
        title: string;
        description: string;
      };
      hero: {
        title: string;
        description: string;
        benefits: {
          title: string;
          description: string;
        }[];
        form: {
          title: string;
          date: string;
          firstName: string;
          lastName: string;
          resume: string;
          cta: string;
        };
      };
    };
  };
};

export const locales = [
  languine.locale.source,
  ...languine.locale.targets,
] as const;
type Dictionaries = Record<keyof typeof locales, () => Promise<Dictionary>>;

const dictionaries = locales.reduce<Dictionaries>((acc, locale) => {
  acc[locale as keyof typeof locales] = () =>
    import(`./dictionaries/${locale}.ts`).then((mod) => mod.default);
  return acc;
}, {} as Dictionaries);

export const getDictionary = async (locale: string) => {
  const dictionary = await dictionaries[locale as keyof typeof locales]();

  return dictionary;
};
