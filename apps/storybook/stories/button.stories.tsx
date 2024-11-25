import type { Meta, StoryObj } from '@storybook/react';
import { Loader2, Mail } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Base: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {},
};
export const Outline: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: 'outline',
  },
};
export const Ghost: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: 'ghost',
  },
};
export const Secondary: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: 'secondary',
  },
};
export const Link: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: 'link',
  },
};
export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Button
    </Button>
  ),
  args: {
    variant: 'outline',
  },
};
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    variant: 'secondary',
  },
};
