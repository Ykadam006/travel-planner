import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: { children: 'Suggested' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Packed</Badge>
      <Badge variant="warning">Suggested</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
