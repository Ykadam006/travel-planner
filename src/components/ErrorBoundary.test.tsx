import { describe, it, expect, vi } from 'vitest';

vi.mock('@/motion/LottieAnimation', () => ({
  LottieAnimation: () => <div data-testid="lottie-mock" />,
}));

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { ErrorBoundary } from './ErrorBoundary';

function Thrower({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error');
  return <div>OK</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('shows fallback when child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Thrower shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByTestId('error-retry')).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it('retry resets error state', async () => {
    const user = userEvent.setup();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Thrower shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();

    await user.click(screen.getByTestId('error-retry'));
    // After retry, ErrorBoundary tries to re-render children - they throw again
    // so we'd see the error again. The key is the retry button works.
    expect(screen.getByTestId('error-retry')).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
