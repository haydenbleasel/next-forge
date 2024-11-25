import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@repo/design-system/components/ui/switch';

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: 'ui/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label htmlFor={args.id} className="peer-disabled:text-foreground/50">
        Airplane Mode
      </label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the switch.
 */
export const Default: Story = {
  args: {
    id: 'default-switch',
  },
};

/**
 * Use the `disabled` prop to disable the switch.
 */
export const Disabled: Story = {
  args: {
    id: 'disabled-switch',
    disabled: true,
  },
};
