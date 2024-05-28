const urls = {
  baseUrl: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL,
};

if (!urls.baseUrl) {
  throw new Error('NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL is not set');
}

if (!urls.appUrl) {
  throw new Error('NEXT_PUBLIC_APP_URL is not set');
}

if (!urls.docsUrl) {
  throw new Error('NEXT_PUBLIC_DOCS_URL is not set');
}

export const baseUrl = urls.baseUrl
  ? `https://${urls.baseUrl}`
  : 'http://localhost:3000';
export const { appUrl } = urls;
export const { docsUrl } = urls;
