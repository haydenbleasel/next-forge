'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { FC } from 'react';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;
