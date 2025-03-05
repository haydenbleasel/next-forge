import 'server-only';

export type Dictionary = {
  web: {
    home: {
      hero: {
        announcement: string;
        title: string;
        description: string;
      };
      cases: {
        title: string;
      };
      features: {
        title: string;
        description: string;
      };
      stats: {
        title: string;
        description: string;
      };
      testimonials: {
        title: string;
      };
      faq: {
        title: string;
        description: string;
      };
      cta: {
        title: string;
        description: string;
      };
    };
  };
};

export const locales = ['en', 'fr'] as const;
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
