import type { FC, ReactNode } from 'react';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;
