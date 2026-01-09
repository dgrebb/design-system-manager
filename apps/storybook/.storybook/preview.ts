import type { Preview } from '@storybook/web-components-vite';

// Import tokens at document level (CSS variables inherit into Shadow DOM)
import '@theme-lab/tokens/tokens.css';

// Import components to register custom elements
import '@theme-lab/components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#0f172a' },
        muted: { name: 'muted', value: '#f8fafc' }
      }
    },
    docs: {
      toc: true,
    },
  },

  globalTypes: {
    theme: {
      description: 'Theme mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return story();
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
