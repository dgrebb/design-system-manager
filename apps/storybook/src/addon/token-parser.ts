import type { TokenValue } from './types';

/**
 * Parse tokens.json to extract token metadata
 */
export function parseTokens(tokensJson: Record<string, unknown>): TokenValue[] {
  const tokens: TokenValue[] = [];

  function processCategory(obj: Record<string, unknown>, category: string, prefix: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Nested object - recurse
        processCategory(value as Record<string, unknown>, category, path);
      } else if (typeof value === 'string' || typeof value === 'number') {
        // Leaf value - this is a token
        const cssVar = `--tl-${category}-${path}`;
        const type = inferTokenType(category, key, String(value));
        
        tokens.push({
          name: path,
          cssVar,
          value: String(value),
          category,
          type,
        });
      }
    }
  }

  for (const [category, categoryTokens] of Object.entries(tokensJson)) {
    if (typeof categoryTokens === 'object' && categoryTokens !== null) {
      processCategory(categoryTokens as Record<string, unknown>, category, '');
    }
  }

  return tokens;
}

function inferTokenType(
  category: string,
  key: string,
  value: string
): TokenValue['type'] {
  // Check category first
  if (category === 'color') return 'color';
  if (category === 'spacing') return 'spacing';
  if (category === 'typography') return 'typography';
  if (category === 'borderRadius') return 'radius';
  if (category === 'shadow') return 'shadow';
  
  // Check value patterns
  if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) {
    return 'color';
  }
  if (value.match(/^\d+(\.\d+)?(px|rem|em|%)$/)) {
    return 'spacing';
  }
  
  return 'other';
}

/**
 * Group tokens by category for UI display
 */
export function groupTokensByCategory(tokens: TokenValue[]): Map<string, TokenValue[]> {
  const groups = new Map<string, TokenValue[]>();
  
  for (const token of tokens) {
    const existing = groups.get(token.category) || [];
    existing.push(token);
    groups.set(token.category, existing);
  }
  
  return groups;
}

/**
 * Filter tokens by type for specific editor views
 */
export function filterTokensByType(
  tokens: TokenValue[],
  type: TokenValue['type']
): TokenValue[] {
  return tokens.filter(t => t.type === type);
}
