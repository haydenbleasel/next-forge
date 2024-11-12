import { request } from '@arcjet/next';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import arcjet, { detectBot } from '@repo/security';
import type { ReactNode } from 'react';
import { PostHogIdentifier } from './components/posthog-identifier';
import { GlobalSidebar } from './components/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Allow preview links to show OG images, but no other bots should be
    // allowed. See https://docs.arcjet.com/bot-protection/identifying-bots
    allow: ['CATEGORY:PREVIEW'],
  })
);

const AppLayout = async ({ children }: AppLayoutProperties) => {
  const req = await request();
  const decision = await aj.protect(req);

  // These errors are handled by the global error boundary, but you could also
  // redirect or show a custom error page
  if (decision.isDenied()) {
    if (decision.reason.isBot()) {
      throw new Error('No bots allowed');
    }

    throw new Error('Access denied');
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    redirectToSignIn();
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        {betaFeature && (
          <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
            Beta feature now available
          </div>
        )}
        {children}
      </GlobalSidebar>
      <PostHogIdentifier />
    </SidebarProvider>
  );
};

export default AppLayout;
