import { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MotionProvider } from '@/motion';

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MotionProvider>
    </ThemeProvider>
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
