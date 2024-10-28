import { auth, currentUser } from '@clerk/nextjs/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
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
  const sale = await showSummerSale();

  if (!user) {
    redirectToSignIn();
  }

  return (
    <SidebarProvider>
      {sale ? <p>discounted</p> : <p>regular price</p>}
      <GlobalSidebar>{children}</GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
