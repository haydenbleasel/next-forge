import { auth, currentUser } from '@clerk/nextjs/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import type { ReactElement, ReactNode } from 'react';
import { GlobalSidebar } from './components/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({
  children,
}: AppLayoutProperties): Promise<ReactElement> => {
  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    redirectToSignIn();
  }

  return (
    <SidebarProvider>
      {betaFeature && (
        <div className="w-full bg-black py-2 text-center text-white">
          Beta feature now available
        </div>
      )}
      <GlobalSidebar>{children}</GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
