import { Knock } from '@knocklabs/node';

const knockApiKey = process.env.KNOCK_API_KEY;

if (!knockApiKey) {
  throw new Error('KNOCK_API_KEY is not set');
}

export const knock = new Knock(knockApiKey);
