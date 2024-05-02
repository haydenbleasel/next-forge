import { Resend } from 'resend';

if (!process.env.RESEND_TOKEN) {
  throw new Error('RESEND_TOKEN environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_TOKEN);
