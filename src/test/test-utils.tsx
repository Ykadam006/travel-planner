import { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MotionProvider } from '@/motion';

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </MotionProvider>
  );
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };
