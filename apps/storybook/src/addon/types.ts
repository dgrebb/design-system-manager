export interface TokenValue {
  name: string;
  cssVar: string;
  value: string;
  category: string;
  type: 'color' | 'spacing' | 'typography' | 'radius' | 'shadow' | 'other';
}

export interface TokenOverrides {
  [cssVar: string]: string;
}

export interface Preset {
  id: string;
  name: string;
  description?: string;
  tokens: TokenOverrides;
  createdAt: number;
  isBuiltIn?: boolean;
}

export interface ThemeLabState {
  tokens: TokenValue[];
  overrides: TokenOverrides;
  activePreset: string | null;
  presets: Preset[];
}
