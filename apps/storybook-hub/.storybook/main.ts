import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  refs: {
    'theme-lab': {
      title: 'Theme Lab',
      url: 'http://localhost:6006',
    },
    // Adapter storybooks will be added here
    // 'shadcn-svelte': {
    //   title: 'shadcn-svelte Adapter',
    //   url: 'http://localhost:6007',
    // },
  },
};

export default config;
