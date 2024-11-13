import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@repo/design-system/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'ui/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Base: Story = {
  render: () => <Badge>Badge</Badge>,
  args: {},
};
