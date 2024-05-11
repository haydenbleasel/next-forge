const prodUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

if (!prodUrl) {
  throw new Error('NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL is not set');
}

export const baseUrl = prodUrl ? `https://${prodUrl}` : 'http://localhost:3000';
