<img src="./app/opengraph-image.png" width="1200" height="630" style="width: 1200px; height: 630px; object-fit: contain;" alt="">

<br />

# Forge

**Robust and comprehensive boilerplate for modern Next.js web apps.**

<hr />

A [Next.js](https://nextjs.org/) project boilerplate bootstrapped with [`next-forge`](https://github.com/haydenbleasel/next-forge). It includes everything required to create a new modern application, including:

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PlanetScale](https://planetscale.com/)
- [Prisma](https://www.prisma.io/)
- [eslint-config-harmony](https://github.com/haydenbleasel/eslint-config-harmony)
- [Next.js 13](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [react.email](https://react.email/)
- [Clerk](https://clerk.com/)
- [Resend](https://resend.com/)
- [Loops](https://loops.so/)
- [next-secure-headers](https://www.npmjs.com/package/next-secure-headers)
- [BetterStack](https://betterstack.com/)
- [Google Fonts](https://fonts.google.com/)
- [Vercel AI + OpenAI](https://www.npmjs.com/package/ai)
- [Canny](https://canny.io/)
- [Stripe](https://stripe.com/)
- [Sentry](https://sentry.io/)
- [React Wrap Balancer](https://react-wrap-balancer.vercel.app/)
- [Contentlayer](https://contentlayer.dev/)

## Usage

First, scaffold the app with:

```bash
yarn create next-app --example https://github.com/beskar-co/forge
```

Once it is downloaded, rename `.env.example` to `.env`. This will turn the example environment variables into your local ones. This file is not committed to GitHub by default (and shouldn't be). You can do this in Terminal with:

```bash
mv .env.example .env
```

Update any reference of `/CompanyName/` in the legal docs.

Then, run the development server with `yarn dev`, then open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
