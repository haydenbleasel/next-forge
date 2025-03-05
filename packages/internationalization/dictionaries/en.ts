import type { Dictionary } from '..';

const dictionary: Dictionary = {
  web: {
    header: {
      home: 'Home',
      product: {
        title: 'Product',
        description: 'Managing a small business today is already tough.',
        cta: 'Book a call today',
        items: [
          {
            title: 'Pricing',
            href: '/pricing',
          },
          {
            title: 'Pricing',
            href: '/pricing',
          },
          {
            title: 'Pricing',
            href: '/pricing',
          },
          {
            title: 'Pricing',
            href: '/pricing',
          },
        ],
      },
      blog: 'Blog',
      docs: 'Docs',
      contact: 'Contact',
      signIn: 'Sign in',
      signUp: 'Get started',
    },
    home: {
      meta: {
        title: 'Transform Your Business Operations Today',
        description:
          "In today's fast-paced world, your business deserves better than outdated trading systems. Our innovative platform streamlines operations, reduces complexity, and helps small businesses thrive in the modern economy.",
      },
      hero: {
        announcement: 'Read our latest article',
        title: 'Transform Your Business Operations Today',
        description:
          "In today's fast-paced world, your business deserves better than outdated trading systems. Our innovative platform streamlines operations, reduces complexity, and helps small businesses thrive in the modern economy.",
        primaryCta: 'Get in touch',
        secondaryCta: 'Sign up',
      },
      cases: {
        title: 'Empowering Success Stories Across the Globe',
      },
      features: {
        title: 'Powerful Tools for Modern Business',
        description:
          'Discover how our cutting-edge features can revolutionize your daily operations.',
        items: [
          {
            title: 'Streamlined Operations',
            description:
              'Our platform streamlines operations, reduces complexity, and helps small businesses thrive in the modern economy.',
          },
          {
            title: 'Real-Time Analytics',
            description:
              'Get instant insights into your business performance with comprehensive analytics and reporting tools that help you make data-driven decisions.',
          },
          {
            title: 'Secure Trading Platform',
            description:
              'Trade with confidence using our enterprise-grade security features, ensuring your transactions and data are protected around the clock.',
          },
          {
            title: 'Automated Workflows',
            description:
              'Save time and reduce errors with intelligent automation that handles routine tasks and keeps your business running smoothly.',
          },
        ],
      },
      stats: {
        title: 'Real Results, Real Impact',
        description:
          'Join thousands of businesses that have transformed their operations with our platform. Our solutions have helped companies reduce administrative overhead by 60% and increase trading efficiency by 45% on average.',
        items: [
          {
            metric: 500000,
            description: 'Monthly active users',
            delta: 20.1,
          },
          {
            metric: 20105,
            description: 'Daily active users',
            delta: -2,
          },
          {
            metric: 523520,
            description: 'Monthly recurring revenue',
            delta: 8,
          },
          {
            metric: 1052,
            description: 'Cost per acquisition',
            delta: 2,
          },
        ],
      },
      testimonials: {
        title: 'Hear from Our Thriving Community',
        items: [
          {
            title: 'Best decision',
            description:
              'Our goal was to streamline SMB trade, making it easier and faster than ever and we did it together.',
            author: {
              name: 'Hayden Bleasel',
              image: 'https://github.com/haydenbleasel.png',
            },
          },
          {
            title: 'Game Changer',
            description:
              'The platform has revolutionized how we handle international trade. The automated compliance checks alone have saved us countless hours.',
            author: {
              name: 'Lee Robinson',
              image: 'https://github.com/leerob.png',
            },
          },
          {
            title: 'Exceeded Expectations',
            description:
              'We were looking for a solution to streamline our trading operations, but we got so much more. The analytics and insights have been invaluable.',
            author: {
              name: 'shadcn',
              image: 'https://github.com/shadcn.png',
            },
          },
          {
            title: 'Outstanding Support',
            description:
              'The customer service team has been exceptional. Any questions we had were answered promptly, making the transition seamless.',
            author: {
              name: 'Pontus',
              image: 'https://github.com/pontusab.png',
            },
          },
        ],
      },
      faq: {
        title: 'Common Questions, Expert Answers',
        description:
          "Get quick answers to your most pressing questions about our platform. We've compiled everything you need to know about transforming your business operations and getting started with modern trading solutions.",
        cta: 'Any questions? Reach out',
        items: [
          {
            question: 'What is the platform?',
            answer:
              'The platform is a trading platform that allows you to trade with confidence.',
          },
          {
            question: 'How secure is the platform?',
            answer:
              'Our platform employs bank-grade security measures, including end-to-end encryption, two-factor authentication, and regular security audits to ensure your data and transactions are protected.',
          },
          {
            question: 'What kind of support do you offer?',
            answer:
              'We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated team of experts is always ready to help with any questions or issues.',
          },
          {
            question: 'Can I integrate with my existing systems?',
            answer:
              'Yes, our platform offers robust API integration capabilities and supports connections with major ERP systems, accounting software, and other business tools to ensure seamless operations.',
          },
          {
            question: 'What are the costs involved?',
            answer:
              'We offer flexible pricing plans tailored to businesses of different sizes. Our transparent pricing structure includes all core features, with optional add-ons available for specific needs.',
          },
          {
            question: 'How long does implementation take?',
            answer:
              'Most businesses can get up and running within 1-2 weeks. Our onboarding team provides comprehensive support to ensure a smooth transition and quick time-to-value.',
          },
          {
            question: 'Do you offer training for new users?',
            answer:
              'Yes, we provide extensive training resources including video tutorials, documentation, webinars, and personalized training sessions to help your team maximize platform benefits.',
          },
          {
            question: 'What makes your platform different from others?',
            answer:
              'Our platform stands out through its intuitive interface, comprehensive feature set, advanced automation capabilities, and industry-leading security measures, all backed by exceptional customer support.',
          },
        ],
      },
      cta: {
        title: 'Start Your Business Transformation',
        description:
          "Join thousands of forward-thinking businesses who have already modernized their operations. Our platform offers the tools, support, and efficiency you need to succeed in today's competitive market. Get started in minutes.",
        primaryCta: 'Jump on a call',
        secondaryCta: 'Sign up today',
      },
    },
    blog: {
      meta: {
        title: 'Blog',
        description: 'Thoughts, ideas, and opinions.',
      },
    },
    contact: {
      meta: {
        title: 'Contact',
        description:
          "Let us know what's on your mind. We'll get back to you as soon as possible.",
      },
      hero: {
        title: "Let's Talk About Your Business",
        description:
          'Schedule a consultation with our team to discuss how we can help streamline your operations and drive growth for your business.',
        benefits: [
          {
            title: 'Personalized Consultation',
            description:
              'Get tailored solutions and expert advice specific to your business needs.',
          },
          {
            title: 'Quick Response',
            description:
              'Our team typically responds within 24 hours to schedule your consultation.',
          },
          {
            title: 'No Commitment Required',
            description:
              'Free consultation to understand your needs and explore how we can help.',
          },
        ],
        form: {
          title: 'Book a meeting',
          date: 'Date',
          firstName: 'First name',
          lastName: 'Last name',
          resume: 'Upload resume',
          cta: 'Book the meeting',
        },
      },
    },
  },
};

export default dictionary;
