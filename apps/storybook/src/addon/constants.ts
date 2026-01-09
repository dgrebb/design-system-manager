export const ADDON_ID = 'theme-lab';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = 'themeLab';

// Storage keys
export const STORAGE_KEY_TOKENS = 'theme-lab-tokens';
export const STORAGE_KEY_PRESETS = 'theme-lab-presets';
export const STORAGE_KEY_ACTIVE_PRESET = 'theme-lab-active-preset';

// Event channels
export const EVENTS = {
  TOKEN_CHANGE: `${ADDON_ID}/token-change`,
  PRESET_LOAD: `${ADDON_ID}/preset-load`,
  RESET_TOKENS: `${ADDON_ID}/reset-tokens`,
} as const;
