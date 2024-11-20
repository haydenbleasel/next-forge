import { env } from '@repo/env';
import { Status } from '@repo/observability/status';
import Link from 'next/link';

interface FooterItem {
  title: string;
  description: string;
  href?: string;
  items?: { title: string; href: string }[];
}

export const Footer = () => {
  const navigationItems: FooterItem[] = [
    {
      title: 'Product',
      description: 'Everything you need to build and ship faster.',
      items: [
        {
          title: 'Features',
          href: '/features',
        },
        {
          title: 'Templates',
          href: '/templates',
        },
        {
          title: 'Integrations',
          href: '/integrations',
        },
        {
          title: 'Enterprise',
          href: '/enterprise',
        },
        {
          title: 'Pricing',
          href: '/pricing',
        },
      ],
    },
    {
      title: 'Resources',
      description: 'Learn and build with ShipKit.',
      items: [
        {
          title: 'Documentation',
          href: env.NEXT_PUBLIC_DOCS_URL,
        },
        {
          title: 'Blog',
          href: '/blog',
        },
        {
          title: 'Guides',
          href: '/guides',
        },
        {
          title: 'Showcase',
          href: '/showcase',
        },
      ],
    },
    {
      title: 'Company',
      description: 'Learn more about us and our mission.',
      items: [
        {
          title: 'About',
          href: '/about',
        },
        {
          title: 'Contact',
          href: '/contact',
        },
        {
          title: 'Terms',
          href: '/legal/terms',
        },
        {
          title: 'Privacy',
          href: '/legal/privacy',
        },
      ],
    },
  ];

  return (
    <section className="dark border-foreground/10 border-t">
      <div className="w-full bg-background py-20 text-foreground lg:py-40">
        <div className="container mx-auto">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                  ShipKit
                </h2>
                <p className="max-w-lg text-left text-foreground/75 text-lg leading-relaxed tracking-tight">
                  The modern toolkit for building and shipping web applications
                  faster.
                </p>
              </div>
              <Status />
            </div>
            <div className="grid items-start gap-10 lg:grid-cols-3">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-start gap-1 text-base"
                >
                  <div className="flex flex-col gap-2">
                    {item?.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between"
                        target={
                          item.href.includes('http') ? '_blank' : undefined
                        }
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
                        <span className="text-foreground/75">
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
    </section>
  );
};
