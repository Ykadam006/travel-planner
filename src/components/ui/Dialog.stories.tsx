import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from './Button';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo({ variant }: { variant: 'center' | 'bottom' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {variant} dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Compare destinations"
        description="2 selected"
        variant={variant}
      >
        <p className="text-theme-text-muted">
          Focus is trapped inside, Escape closes, and the page behind is scroll-locked — all via
          Radix. Motion handles the enter/exit choreography.
        </p>
      </Dialog>
    </>
  );
}

export const Center: Story = {
  args: { open: false, onOpenChange: () => {}, title: '', children: null },
  render: () => <DialogDemo variant="center" />,
};

export const BottomSheet: Story = {
  args: { open: false, onOpenChange: () => {}, title: '', children: null },
  render: () => <DialogDemo variant="bottom" />,
};
