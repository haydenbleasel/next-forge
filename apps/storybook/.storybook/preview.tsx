import { Toaster } from '@repo/design-system/components/ui/sonner';
import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';
import { ThemeProvider } from '@repo/design-system/providers/theme';
import type { Preview } from '@storybook/react';

import '@repo/design-system/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'light',
          value: 'hsl(0 0% 100%)',
        },
        {
          name: 'dark',
          value: 'hsl(0 0% 3.9%)',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <TooltipProvider>
          <Story />
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    ),
  ],
};

export default preview;
