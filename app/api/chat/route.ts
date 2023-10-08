import OpenAI from 'openai';
import { OpenAIStream as openAIStream, StreamingTextResponse } from 'ai';
import { features } from '@/lib/features';
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
          'You are an AI chatbot embedded on a website about next-forge, a robust and comprehensive boilerplate for modern Next.js web apps.',
          `It uses the following technologies: ${JSON.stringify(features)}.`,
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
