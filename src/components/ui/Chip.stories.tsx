import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  title: 'UI/Chip',
  component: Chip,
  args: { children: 'Landmark' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true } };

const CATEGORIES = ['All', 'Landmark', 'Historical Site', 'Ancient City', 'Monument'];

function FilterRowDemo() {
  const [active, setActive] = useState('All');
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <Chip key={cat} selected={active === cat} onClick={() => setActive(cat)}>
          {cat}
        </Chip>
      ))}
    </div>
  );
}

export const FilterRow: Story = {
  render: () => <FilterRowDemo />,
};
