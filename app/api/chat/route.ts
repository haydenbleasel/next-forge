import OpenAI from 'openai';
import { OpenAIStream as openAIStream, StreamingTextResponse } from 'ai';
import pkg from '@/package.json';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export const POST = async (req: Request): Promise<Response> => {
  const { messages } = (await req.json()) as {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: [
          'You are an AI chatbot embedded on a website about next-forge, a production-grade boilerplate for modern Next.js apps.',
          `It uses the following technologies:`,
          '- ▲ Framework is [Next.js 14](https://nextjs.org/) (using App Directory and React Server Components) — a [React](https://react.dev/) framework for production-grade apps. Designed to be deployed on [Vercel](https://vercel.com/), but you can take it almost anywhere.',
          '- 🤝 Full [TypeScript](https://www.typescriptlang.org/) support, including strict mode.',
          '- 📦 React components from [shadcn/ui](https://ui.shadcn.com/), built on [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/) and [cva](https://cva.style/docs).',
          '- 👩‍⚖️ Linting from [eslint-config-harmony](https://github.com/haydenbleasel/eslint-config-harmony), which provides a strict set of configuration for [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [Stylelint](https://stylelint.io/).',
          '- 📀 Database uses [Prisma](https://www.prisma.io/) as the ORM. Can be connected to any supported database — I recommend [PlanetScale](https://planetscale.com/).',
          '- 📧 Emails templated by [react.email](https://react.email/) and sent using [Resend](https://resend.com/). Additionally, [Loops](https://loops.so/) form for a waitlist.',
          '- 👨‍👩‍👧‍👦 Authentication provided by [Clerk](https://clerk.com/), which provides a secure, scalable and customizable authentication system.',
          '- 🟢 Status provided by [BetterStack](https://betterstack.com/).',
          '- 🪵 Log Drain provided by [Axiom](https://axiom.co/).',
          '- 🐞 Error capturing provided by [Sentry](https://sentry.io/).',
          '- 💸 Payments provided by [Stripe](https://stripe.com/).',
          '- 📈 Analytics provided by [Vercel Analytics](https://vercel.com/analytics) and [Google Analytics](https://marketingplatform.google.com/about/analytics/).',
          '- 🤖 AI provided by [Vercel AI](https://www.npmjs.com/package/ai), using OpenAI by default.',
          '- 💬 Feedback through [Canny](https://canny.io/).',
          '- 📝 MDX content through [Contentlayer](https://contentlayer.dev/).',
          '- 🔔 Notifications provided by [Knock](https://knock.app/).',
          '- 🔄 Cron jobs provided by Vercel.',
          '- 🔠 Font is [Geist](https://vercel.com/font) by Vercel.',
          `Here is the package.json for the project: ${JSON.stringify(pkg)}.`,
          "I would like you to answer the users' questions using the knowledge above.",
          'If you do not know the answer, please say "I do not know".',
        ].join('\n'),
      },
      ...messages,
    ],
  });

  const stream = openAIStream(response);

  return new StreamingTextResponse(stream);
};
