# next-forge

**A production-grade boilerplate for modern Next.js apps.**

![Example](./apps/app/app/opengraph-image.png)

[`next-forge`](https://github.com/haydenbleasel/next-forge) is a [Next.js](https://nextjs.org/) project boilerplate for modern web application. It is designed to be a comprehensive starting point for new apps, providing a solid, opinionated foundation with a minimal amount of configuration.

## Features

- ▲ Framework is [Next.js 14](https://nextjs.org/) (using App Directory and React Server Components) — a [React](https://react.dev/) framework for production-grade apps. Designed to be deployed on [Vercel](https://vercel.com/), but you can take it almost anywhere.
- 🧱 Monorepo architecture through [Turborepo](https://turbo.build/repo).
- 🤝 Full [TypeScript](https://www.typescriptlang.org/) support, including strict mode.
- 📦 React components from [shadcn/ui](https://ui.shadcn.com/), built on [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/), [cva](https://cva.style/docs), [Vaul](https://vaul.emilkowal.ski/) and [Sonner](https://sonner.emilkowal.ski/).
- 👩‍⚖️ Linting from [eslint-config-harmony](https://github.com/haydenbleasel/eslint-config-harmony), which provides a strict set of configuration for [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [Stylelint](https://stylelint.io/).
- 📀 Database uses [Prisma](https://www.prisma.io/) as the ORM. Can be connected to any supported database — I recommend [PlanetScale](https://planetscale.com/).
- 📧 Emails templated by [react.email](https://react.email/) sent using [Resend](https://resend.com/), including Audiences for waitlist.
- 👨‍👩‍👧‍👦 Authentication provided by [Clerk](https://clerk.com/), which provides a secure, scalable and customizable authentication system.
- 🟢 Log Drain and Status provided by [BetterStack](https://betterstack.com/).
- 🐞 Error capturing provided by [Sentry](https://sentry.io/).
- 💸 Payments provided by [Stripe](https://stripe.com/).
- 📈 Analytics provided by [Vercel Analytics](https://vercel.com/analytics) and [Google Analytics](https://marketingplatform.google.com/about/analytics/).
- 🤖 AI provided by [Vercel AI](https://www.npmjs.com/package/ai), using OpenAI by default.
- 📝 MDX content through [Contentlayer](https://contentlayer.dev/).
- 🔔 Notifications provided by [Knock](https://knock.app/).
- 🔄 Cron jobs provided by Vercel.
- 🔠 Font is [Geist](https://vercel.com/font) by Vercel.

... plus a stack of other features for customization, security and performance.

## Philosophy

`next-forge` is a culmination of my experience building web apps over the last decade and focuses on a few key principles:

1. The project should be **fast**. This doesn't just mean fast to build, run and deploy. It also means it should be fast to validate ideas, iterate and scale. This is important for finding product-market fit and growing a business.
2. The project should be **cheap**, at least to start. It should avoid a flat cost, or have a generous free tier. I try to make all my projects self-sustaining, so the goal is to avoid any recurring costs upfront and find services that scale with me.
3. The project should be **opinionated**. This means that the tooling should be designed to work together, and the project should be designed to work with the tooling. This is important for reducing friction and increasing productivity.
4. The project should be **modern**. This means that the tooling should be actively maintained, and the project should be designed to take advantage of the latest features. This is important for reducing technical debt and increasing longevity.

## Structure

`next-forge` is a monorepo, which means it contains multiple packages in a single repository. This is a common pattern for modern web applications, as it allows you to share code between different parts of the application, and manage them all together.

The monorepo is managed by [Turborepo](https://turbo.build/repo), which is a tool for managing monorepos. It provides a simple way to manage multiple packages in a single repository, and is designed to work with modern web applications.

The monorepo contains the following apps:

- `app` — The main, which contains the Next.js app.
- `api` — The API, which contains serverless functions designed to run separately from the main app e.g. webhooks and cron jobs.
- `web` — The website, which contains the static website for the app e.g. marketing pages and legal docs.

It also contains the following packages:

- `@repo/design-system`: The design system, which contains shared components, utility files and styles.
- `@repo/email`: The email templates, which contains the email templates for the app.
- `@repo/database`: The database, which contains the database schema and migrations for the app.
- `@repo/typescript-config`: The TypeScript configuration, which contains the shared TypeScript configuration for the app.
- `@repo/eslint-config`: The ESLint configuration, which contains the shared ESLint configuration for the app.

## Usage

First, scaffold the app with:

```sh
pnpm create next-app --example https://github.com/haydenbleasel/next-forge
```

Then, run the setup script and pass in the name of your app / company:

```sh
./setup.sh Acme
```

Login to Stripe with:

```sh
stripe login
```

Login to Planetscale with

```sh
pscale auth login
```

Finally, run the development server with:

```sh
pnpm dev
```

Open the following URLs to see the app:

- [http://localhost:3000/](http://localhost:3000/) — The main app.
- [http://localhost:3001/](http://localhost:3001/) — The website.

## Deploying

`next-forge` is designed to be deployed on Vercel with the [BetterStack](https://vercel.com/integrations/betterstack) and [Sentry](https://vercel.com/integrations/sentry) integrations. This will take care of the relevant API keys and tokens.

## Notes

- `next-forge` makes use of a custom proxy setup for Segment's client-side library to avoid ad-blocker issues. This is not required, but recommended. You'll need to contact Segment support to enable this in your UI. Read more about this [here](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/#custom-cdn--api-proxy).
