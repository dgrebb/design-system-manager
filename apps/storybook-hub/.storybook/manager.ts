import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Theme Lab Hub',
  brandUrl: '/',
  
  // Colors
  colorPrimary: '#8b5cf6',
  colorSecondary: '#8b5cf6',
  
  // UI
  appBg: '#faf5ff',
  appContentBg: '#ffffff',
  appBorderColor: '#e9d5ff',
  appBorderRadius: 6,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", monospace',
  
  // Text colors
  textColor: '#1e1b4b',
  textInverseColor: '#ffffff',
  textMutedColor: '#6b7280',
  
  // Toolbar
  barTextColor: '#6b7280',
  barSelectedColor: '#8b5cf6',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e9d5ff',
  inputTextColor: '#1e1b4b',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
