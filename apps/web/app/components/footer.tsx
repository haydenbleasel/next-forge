import { docsUrl } from '@repo/design-system/lib/consts';
import Link from 'next/link';

export const Footer = () => {
  const navigationItems = [
    {
      title: 'Home',
      href: '/',
      description: '',
    },
    {
      title: 'Pages',
      description: 'Managing a small business today is already tough.',
      items: [
        {
          title: 'Blog',
          href: '/blog',
        },
        {
          title: 'Docs',
          href: docsUrl,
        },
      ],
    },
    {
      title: 'Legal',
      description: 'We stay on top of the latest legal requirements.',
      items: [
        {
          title: 'Terms of Service',
          href: '/legal/terms',
        },
        {
          title: 'Privacy Policy',
          href: '/legal/privacy',
        },
        {
          title: 'Acceptable Use',
          href: '/legal/acceptable-use',
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-foreground py-20 text-background lg:py-40">
      <div className="container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                next-forge
              </h2>
              <p className="max-w-lg text-left text-background/75 text-lg leading-relaxed tracking-tight">
                This is the start of something new.
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <div className="flex max-w-lg flex-col text-left text-background/75 text-sm leading-relaxed tracking-tight">
                <p>1 Tailwind Way</p>
                <p>Menlo Park</p>
                <p>CA 94025</p>
              </div>
            </div>
          </div>
          <div className="grid items-start gap-10 lg:grid-cols-3">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-1 text-base"
              >
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between"
                      target={item.href.includes('http') ? '_blank' : undefined}
                      rel={
                        item.href.includes('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  ) : (
                    <p className="text-xl">{item.title}</p>
                  )}
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="flex items-center justify-between"
                      target={
                        subItem.href.includes('http') ? '_blank' : undefined
                      }
                      rel={
                        subItem.href.includes('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      <span className="text-background/75">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
