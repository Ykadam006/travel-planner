import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-8 text-center"
          data-testid="error-boundary"
          role="alert"
        >
          <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
          <p className="mt-2 text-sm text-red-700">{this.state.error.message}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={this.handleRetry}
            data-testid="error-retry"
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
