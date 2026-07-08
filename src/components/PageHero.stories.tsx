import type { Meta, StoryObj } from '@storybook/react';
import { PageHero } from './PageHero';
import { Button } from './ui';

const meta = {
  title: 'Layout/PageHero',
  component: PageHero,
  args: {
    title: 'Plan Your Itinerary',
    subtitle: 'Add activities and dates, or pick from popular itineraries.',
  },
} satisfies Meta<typeof PageHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCTA: Story = {
  args: { cta: <Button>Get started</Button> },
};
