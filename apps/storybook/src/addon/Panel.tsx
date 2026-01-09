import React, { useCallback, useEffect, useState } from 'react';
import { useChannel } from 'storybook/manager-api';
import type { TokenValue, TokenOverrides, Preset } from './types';
import { EVENTS } from './constants';
import { presetManager } from './preset-manager';
import { parseTokens } from './token-parser';

// Import tokens.json at build time
import tokensJson from '@theme-lab/tokens/tokens.json';

interface PanelProps {
  active: boolean;
}

const styles = {
  panel: {
    padding: '16px',
    height: '100%',
    overflow: 'auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 600,
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer',
  },
  buttonPrimary: {
    background: '#3b82f6',
    color: '#fff',
    border: '1px solid #3b82f6',
  },
  section: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '4px',
    color: '#666',
  },
  select: {
    width: '100%',
    padding: '6px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '13px',
  },
  input: {
    padding: '6px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '13px',
  },
  saveRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  separator: {
    height: '1px',
    background: '#e2e8f0',
    margin: '16px 0',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '16px',
  },
  tab: {
    padding: '8px 16px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#666',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    color: '#3b82f6',
    borderBottom: '2px solid #3b82f6',
  },
  tokenList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  tokenRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tokenLabel: {
    flex: 1,
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#666',
  },
  tokenLabelOverridden: {
    color: '#3b82f6',
  },
  colorInput: {
    width: '32px',
    height: '24px',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  textInput: {
    width: '100px',
    padding: '4px 6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '12px',
    fontFamily: 'monospace',
  },
  textInputOverridden: {
    borderColor: '#3b82f6',
  },
  emptyMessage: {
    color: '#999',
    fontSize: '12px',
    fontStyle: 'italic',
  },
};

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const [tokens, setTokens] = useState<TokenValue[]>([]);
  const [overrides, setOverrides] = useState<TokenOverrides>({});
  const [presets, setPresets] = useState<Preset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('colors');
  const [newPresetName, setNewPresetName] = useState('');

  const emit = useChannel({
    [EVENTS.TOKEN_CHANGE]: () => {},
    [EVENTS.PRESET_LOAD]: () => {},
    [EVENTS.RESET_TOKENS]: () => {},
  });

  // Initialize tokens from tokens.json
  useEffect(() => {
    const parsedTokens = parseTokens(tokensJson);
    setTokens(parsedTokens);
    setOverrides(presetManager.getTokenOverrides());
    setPresets(presetManager.getPresets());
    setActivePresetId(presetManager.getActivePreset()?.id || null);
  }, []);

  const applyOverrides = useCallback((newOverrides: TokenOverrides) => {
    emit(EVENTS.TOKEN_CHANGE, newOverrides);
  }, [emit]);

  const handleTokenChange = useCallback((cssVar: string, value: string) => {
    presetManager.setTokenOverride(cssVar, value);
    const newOverrides = presetManager.getTokenOverrides();
    setOverrides(newOverrides);
    setActivePresetId(null);
    applyOverrides(newOverrides);
  }, [applyOverrides]);

  const handlePresetLoad = useCallback((presetId: string) => {
    const newOverrides = presetManager.loadPreset(presetId);
    setOverrides(newOverrides);
    setActivePresetId(presetId);
    applyOverrides(newOverrides);
  }, [applyOverrides]);

  const handleSavePreset = useCallback(() => {
    if (!newPresetName.trim()) return;
    const preset = presetManager.saveAsPreset(newPresetName.trim());
    setPresets(presetManager.getPresets());
    setActivePresetId(preset.id);
    setNewPresetName('');
  }, [newPresetName]);

  const handleReset = useCallback(() => {
    presetManager.reset();
    setOverrides({});
    setActivePresetId('default');
    applyOverrides({});
  }, [applyOverrides]);

  const handleExportCSS = useCallback(() => {
    const lines = Object.entries(overrides).map(
      ([prop, value]) => `  ${prop}: ${value};`
    );
    const css = `:root {\n${lines.join('\n')}\n}`;
    navigator.clipboard.writeText(css);
  }, [overrides]);

  const handleDownloadCSS = useCallback(() => {
    const lines = Object.entries(overrides).map(
      ([prop, value]) => `  ${prop}: ${value};`
    );
    const css = `:root {\n${lines.join('\n')}\n}`;
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-overrides.css';
    a.click();
    URL.revokeObjectURL(url);
  }, [overrides]);

  if (!active) return null;

  const colorTokens = tokens.filter(t => t.type === 'color');
  const spacingTokens = tokens.filter(t => t.type === 'spacing');
  const typographyTokens = tokens.filter(t => t.type === 'typography');
  const otherTokens = tokens.filter(t => !['color', 'spacing', 'typography'].includes(t.type));

  const getTabTokens = () => {
    switch (activeTab) {
      case 'colors': return colorTokens;
      case 'spacing': return spacingTokens;
      case 'typography': return typographyTokens;
      case 'other': return otherTokens;
      default: return [];
    }
  };

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Theme Lab</h3>
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={handleExportCSS}>Copy CSS</button>
          <button style={styles.button} onClick={handleDownloadCSS}>Download</button>
          <button style={styles.button} onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Preset selector */}
      <div style={styles.section}>
        <label style={styles.label}>Preset</label>
        <select
          value={activePresetId || ''}
          onChange={(e) => handlePresetLoad(e.target.value)}
          style={styles.select}
        >
          <option value="">Custom</option>
          {presets.map(preset => (
            <option key={preset.id} value={preset.id}>
              {preset.name} {preset.isBuiltIn ? '' : '(custom)'}
            </option>
          ))}
        </select>
      </div>

      {/* Save preset */}
      <div style={styles.saveRow}>
        <input
          type="text"
          placeholder="New preset name..."
          value={newPresetName}
          onChange={(e) => setNewPresetName(e.target.value)}
          style={{ ...styles.input, flex: 1 }}
        />
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          onClick={handleSavePreset}
          disabled={!newPresetName.trim()}
        >
          Save
        </button>
      </div>

      <div style={styles.separator} />

      {/* Tabs */}
      <div style={styles.tabs}>
        {['colors', 'spacing', 'typography', 'other'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Token list */}
      <div style={styles.tokenList}>
        {getTabTokens().length === 0 ? (
          <p style={styles.emptyMessage}>No tokens in this category</p>
        ) : (
          getTabTokens().map(token => {
            const isColor = token.type === 'color';
            const currentValue = overrides[token.cssVar] || token.value;
            const isOverridden = token.cssVar in overrides;

            return (
              <div key={token.cssVar} style={styles.tokenRow}>
                <label
                  style={{
                    ...styles.tokenLabel,
                    ...(isOverridden ? styles.tokenLabelOverridden : {}),
                  }}
                  title={token.cssVar}
                >
                  {token.name}
                </label>
                {isColor && (
                  <input
                    type="color"
                    value={currentValue.startsWith('#') ? currentValue : '#000000'}
                    onChange={(e) => handleTokenChange(token.cssVar, e.target.value)}
                    style={styles.colorInput}
                  />
                )}
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => handleTokenChange(token.cssVar, e.target.value)}
                  style={{
                    ...styles.textInput,
                    ...(isOverridden ? styles.textInputOverridden : {}),
                    width: isColor ? '80px' : '120px',
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
