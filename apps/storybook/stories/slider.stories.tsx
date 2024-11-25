import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '@repo/design-system/components/ui/slider';

const meta: Meta<typeof Slider> = {
  title: 'ui/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Base: Story = {
  args: {
    defaultValue: [33],
    max: 100,
    step: 1,
  },
};
