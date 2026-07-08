import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressRing } from './Progress';

const meta = {
  title: 'UI/Progress',
  component: ProgressBar,
  args: { value: 60, label: 'Packing progress' },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Ring: Story = {
  render: (args) => <ProgressRing {...args} />,
};
