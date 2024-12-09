import { createOpenAI } from '@ai-sdk/openai';
import { keys } from '../keys';

export const provider = createOpenAI({
  apiKey: keys().OPENAI_API_KEY,
  compatibility: 'strict',
});
