import { createOpenAI } from '@ai-sdk/openai';
import { env } from '@repo/env';

export const provider = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: 'strict',
});
