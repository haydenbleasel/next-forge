import { createOpenAI } from '@ai-sdk/openai';
import { ai } from '@repo/ai/keys';

export const provider = createOpenAI({
  apiKey: ai().OPENAI_API_KEY,
  compatibility: 'strict',
});
