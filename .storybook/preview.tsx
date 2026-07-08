import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles.css';

/* Theme switcher — stamps the app's .dark class on <html> like ThemeContext does */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Ghumakkad theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return (
        <div className="app-shell min-h-screen p-8" style={{ background: 'var(--bg)' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
