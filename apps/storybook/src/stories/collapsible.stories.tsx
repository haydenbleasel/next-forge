import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/design-system/components/ui/collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'ui/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Closed: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
          @radix-ui/colors
        </div>
        <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    open: false,
    onOpenChange: () => null,
  },
};
export const Open: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
          @radix-ui/colors
        </div>
        <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    open: true,
    onOpenChange: () => null,
  },
};
