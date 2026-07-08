import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  args: { placeholder: 'Search for a city or place...' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Input {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Input {...args} disabled />
    </div>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <div className="max-w-sm">
      <Textarea placeholder="Trip notes…" />
    </div>
  ),
};
