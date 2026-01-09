import type { Decorator } from '@storybook/web-components';
import { STORAGE_KEY_TOKENS } from './constants';
import type { TokenOverrides } from './types';

/**
 * Decorator that applies token overrides to the story.
 * Reads from localStorage and applies CSS variables to document root.
 */
export const withThemeLab: Decorator = (storyFn, context) => {
  // Load overrides from localStorage
  let overrides: TokenOverrides = {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY_TOKENS);
    if (stored) {
      overrides = JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }

  // Apply overrides to document root
  const root = document.documentElement;
  for (const [prop, value] of Object.entries(overrides)) {
    root.style.setProperty(prop, value);
  }

  // Check for story-level token overrides
  const storyOverrides = context.parameters?.themeLab?.tokens;
  if (storyOverrides) {
    for (const [prop, value] of Object.entries(storyOverrides as TokenOverrides)) {
      root.style.setProperty(prop, value);
    }
  }

  return storyFn();
};
