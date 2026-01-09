import type { Preset, TokenOverrides } from './types';
import { STORAGE_KEY_PRESETS, STORAGE_KEY_ACTIVE_PRESET, STORAGE_KEY_TOKENS } from './constants';

// Built-in presets
const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Default theme colors',
    tokens: {},
    createdAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Dark theme with inverted colors',
    tokens: {
      '--tl-color-background-base': '#0f172a',
      '--tl-color-background-subtle': '#1e293b',
      '--tl-color-foreground-base': '#f8fafc',
      '--tl-color-foreground-muted': '#94a3b8',
      '--tl-color-border-base': '#334155',
    },
    createdAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'High contrast for accessibility',
    tokens: {
      '--tl-color-primary-base': '#0000ff',
      '--tl-color-background-base': '#ffffff',
      '--tl-color-foreground-base': '#000000',
      '--tl-color-border-base': '#000000',
    },
    createdAt: 0,
    isBuiltIn: true,
  },
];

export class PresetManager {
  private presets: Preset[] = [];
  private activePresetId: string | null = null;
  private tokenOverrides: TokenOverrides = {};

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      // Load custom presets
      const storedPresets = localStorage.getItem(STORAGE_KEY_PRESETS);
      const customPresets: Preset[] = storedPresets ? JSON.parse(storedPresets) : [];
      
      // Combine built-in and custom presets
      this.presets = [...BUILT_IN_PRESETS, ...customPresets];
      
      // Load active preset
      this.activePresetId = localStorage.getItem(STORAGE_KEY_ACTIVE_PRESET);
      
      // Load current token overrides
      const storedTokens = localStorage.getItem(STORAGE_KEY_TOKENS);
      this.tokenOverrides = storedTokens ? JSON.parse(storedTokens) : {};
    } catch (e) {
      console.warn('Failed to load theme lab state from storage:', e);
      this.presets = [...BUILT_IN_PRESETS];
    }
  }

  private saveToStorage(): void {
    try {
      // Only save custom presets
      const customPresets = this.presets.filter(p => !p.isBuiltIn);
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(customPresets));
      
      if (this.activePresetId) {
        localStorage.setItem(STORAGE_KEY_ACTIVE_PRESET, this.activePresetId);
      } else {
        localStorage.removeItem(STORAGE_KEY_ACTIVE_PRESET);
      }
      
      localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(this.tokenOverrides));
    } catch (e) {
      console.warn('Failed to save theme lab state to storage:', e);
    }
  }

  getPresets(): Preset[] {
    return this.presets;
  }

  getActivePreset(): Preset | null {
    if (!this.activePresetId) return null;
    return this.presets.find(p => p.id === this.activePresetId) || null;
  }

  getTokenOverrides(): TokenOverrides {
    return { ...this.tokenOverrides };
  }

  setTokenOverride(cssVar: string, value: string): void {
    this.tokenOverrides[cssVar] = value;
    this.activePresetId = null; // Custom changes = no preset active
    this.saveToStorage();
  }

  removeTokenOverride(cssVar: string): void {
    delete this.tokenOverrides[cssVar];
    this.saveToStorage();
  }

  loadPreset(presetId: string): TokenOverrides {
    const preset = this.presets.find(p => p.id === presetId);
    if (!preset) return {};
    
    this.tokenOverrides = { ...preset.tokens };
    this.activePresetId = presetId;
    this.saveToStorage();
    
    return this.tokenOverrides;
  }

  saveAsPreset(name: string, description?: string): Preset {
    const preset: Preset = {
      id: `custom-${Date.now()}`,
      name,
      description,
      tokens: { ...this.tokenOverrides },
      createdAt: Date.now(),
      isBuiltIn: false,
    };
    
    this.presets.push(preset);
    this.activePresetId = preset.id;
    this.saveToStorage();
    
    return preset;
  }

  deletePreset(presetId: string): boolean {
    const index = this.presets.findIndex(p => p.id === presetId && !p.isBuiltIn);
    if (index === -1) return false;
    
    this.presets.splice(index, 1);
    if (this.activePresetId === presetId) {
      this.activePresetId = null;
    }
    this.saveToStorage();
    
    return true;
  }

  reset(): void {
    this.tokenOverrides = {};
    this.activePresetId = 'default';
    this.saveToStorage();
  }
}

// Singleton instance
export const presetManager = new PresetManager();
