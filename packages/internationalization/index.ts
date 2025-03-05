import 'server-only';
import languine from './languine.json';

export type Dictionary = {
  web: {
    home: {
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
