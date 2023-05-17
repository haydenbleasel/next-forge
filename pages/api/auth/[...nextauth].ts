import nextAuth from 'next-auth';
import emailProvider from 'next-auth/providers/email';
import { PrismaAdapter as prismaAdapter } from '@next-auth/prisma-adapter';
import domains from 'disposable-email-domains';
import { database } from '@/lib/database';
import { sendEmail } from '@/lib/email';
import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: prismaAdapter(database),
  session: {
    strategy: 'jwt',
  },
  providers: [
    emailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url }) =>
        sendEmail({
          to: identifier,
          subject: 'Verify your email address',
          body: 'You are receiving this email because you (or someone else) have requested the link to sign in to your account. Click the button below to sign in.',
          cta: {
            text: 'Sign in',
            href: url,
          },
        }),
    }),
  ],
  callbacks: {
    signIn({ user }) {
      if (!user.email) {
        throw new Error('Email is required');
      }

      const fragments = user.email.split('@');

      if (fragments.length !== 2) {
        throw new Error('Email is invalid');
      }

      const domain = fragments[1].toLowerCase();

      if (domains.includes(domain)) {
        throw new Error(
          "Sorry, we don't accept disposable email addresses. Please use a different email address."
        );
      }

      return true;
    },
    session({ token, session }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;

      return session;
    },
    async jwt({ token, user }) {
      const databaseUser = await database.user.findFirst({
        where: { email: token.email },
      });

      if (!databaseUser) {
        if (user.id) {
          // eslint-disable-next-line require-atomic-updates
          token.id = user.id;
        }
        return token;
      }

      return {
        id: databaseUser.id,
        name: databaseUser.name,
        email: databaseUser.email,
        image: databaseUser.image,
      } as JWT;
    },
  },
};

export default nextAuth(authOptions);
