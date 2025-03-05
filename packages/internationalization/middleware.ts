import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import { locales } from '.';
import languine from './languine.json';

const getLocale = (request: NextRequest) => {
  const headers = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers }).languages();

  return match(languages, languine.locale.targets, languine.locale.source);
};

export const internationalizationMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
