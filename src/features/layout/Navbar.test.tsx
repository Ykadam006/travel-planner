import { describe, it, expect, vi } from 'vitest';

vi.mock('@/motion/LottieAnimation', () => ({
  LottieAnimation: () => <div data-testid="lottie-mock" />,
}));

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders brand and nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('Ghumakkad')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /plan trip/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /packing/i })).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Menu')).toBeInTheDocument();

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
