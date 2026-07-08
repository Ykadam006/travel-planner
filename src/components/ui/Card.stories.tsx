import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = (
  <div className="p-6">
    <h3 className="font-semibold text-theme-text-main">Santorini Sunset</h3>
    <p className="mt-1 text-sm text-theme-text-muted">Dec 10 · 17:00 · Santorini, Greece</p>
  </div>
);

export const Elevated: Story = { args: { variant: 'elevated', children: body } };
export const Outlined: Story = { args: { variant: 'outlined', children: body } };
export const Filled: Story = { args: { variant: 'filled', children: body } };
