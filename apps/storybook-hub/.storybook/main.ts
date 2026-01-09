import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },

  refs: {
    'theme-lab': {
      title: 'Theme Lab',
      url: 'http://localhost:6006',
    },
    // Adapter storybooks can be added here when running
    // 'shadcn-svelte': {
    //   title: 'shadcn-svelte Adapter',
    //   url: 'http://localhost:6007',
    // },
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
