'use client';

import { ClerkProvider as ClerkProviderRaw } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Theme } from '@clerk/types';
import { tailwind } from '@repo/design-system/lib/tailwind';
import { useTheme } from 'next-themes';
import type { ComponentProps } from 'react';

export const ClerkProvider = (
  props: ComponentProps<typeof ClerkProviderRaw>
) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const baseTheme = isDark ? dark : undefined;
  const variables: Theme['variables'] = {
    // Core
    fontFamily: tailwind.theme.fontFamily.sans.join(', '),
    fontFamilyButtons: tailwind.theme.fontFamily.sans.join(', '),
    fontSize: tailwind.theme.fontSize.sm[0],
    fontWeight: {
      bold: tailwind.theme.fontWeight.bold,
      normal: tailwind.theme.fontWeight.normal,
      medium: tailwind.theme.fontWeight.medium,
    },
    spacingUnit: tailwind.theme.spacing[4],
  };

  const elements: Theme['elements'] = {
    dividerLine: 'bg-border',
    socialButtonsIconButton: 'bg-card',
    navbarButton: 'text-foreground',
    organizationSwitcherTrigger__open: 'bg-background',
    organizationPreviewMainIdentifier: 'text-foreground',
    organizationSwitcherTriggerIcon: 'text-muted-foreground',
    organizationPreview__organizationSwitcherTrigger: 'gap-2',
    organizationPreviewAvatarContainer: 'shrink-0',
  };

  return (
    <ClerkProviderRaw
      {...props}
      appearance={{ baseTheme, variables, elements }}
    />
  );
};
