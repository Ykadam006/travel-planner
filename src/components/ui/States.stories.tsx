import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'UI/States',
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    icon: '🧳',
    title: 'No items yet',
    description: 'Add items manually or pick a predefined list above.',
  },
};

export const Error: Story = {
  render: () => (
    <ErrorState
      title="Search unavailable"
      description="Destination search is having trouble right now."
      onRetry={() => {}}
    />
  ),
};

export const LoadingSkeleton: Story = {
  render: () => (
    <div className="max-w-md space-y-3 rounded-xl border border-theme-border bg-theme-surface p-6">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="h-12 w-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-2/3" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
      </div>
      <Skeleton className="h-40 w-full" />
    </div>
  ),
};
