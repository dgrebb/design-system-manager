/**
 * Token mapping from Theme Lab to shadcn-svelte
 */

export interface TokenMapping {
  themeLabToken: string;
  shadcnVariable: string;
  transform?: 'hsl' | 'none';
}

/**
 * Token mappings for shadcn-svelte
 */
export const tokenMap: TokenMapping[] = [
  // Background & Foreground
  { themeLabToken: '--tl-color-background-base', shadcnVariable: '--background', transform: 'hsl' },
  { themeLabToken: '--tl-color-foreground-base', shadcnVariable: '--foreground', transform: 'hsl' },

  // Card
  { themeLabToken: '--tl-color-background-base', shadcnVariable: '--card', transform: 'hsl' },
  { themeLabToken: '--tl-color-foreground-base', shadcnVariable: '--card-foreground', transform: 'hsl' },

  // Popover
  { themeLabToken: '--tl-color-background-base', shadcnVariable: '--popover', transform: 'hsl' },
  { themeLabToken: '--tl-color-foreground-base', shadcnVariable: '--popover-foreground', transform: 'hsl' },

  // Primary
  { themeLabToken: '--tl-color-primary-base', shadcnVariable: '--primary', transform: 'hsl' },
  { themeLabToken: '--tl-color-primary-foreground', shadcnVariable: '--primary-foreground', transform: 'hsl' },

  // Secondary
  { themeLabToken: '--tl-color-secondary-base', shadcnVariable: '--secondary', transform: 'hsl' },
  { themeLabToken: '--tl-color-secondary-foreground', shadcnVariable: '--secondary-foreground', transform: 'hsl' },

  // Muted
  { themeLabToken: '--tl-color-background-muted', shadcnVariable: '--muted', transform: 'hsl' },
  { themeLabToken: '--tl-color-foreground-muted', shadcnVariable: '--muted-foreground', transform: 'hsl' },

  // Accent
  { themeLabToken: '--tl-color-primary-hover', shadcnVariable: '--accent', transform: 'hsl' },
  { themeLabToken: '--tl-color-primary-foreground', shadcnVariable: '--accent-foreground', transform: 'hsl' },

  // Destructive
  { themeLabToken: '--tl-color-error-base', shadcnVariable: '--destructive', transform: 'hsl' },
  { themeLabToken: '--tl-color-error-foreground', shadcnVariable: '--destructive-foreground', transform: 'hsl' },

  // Border & Input & Ring
  { themeLabToken: '--tl-color-border-base', shadcnVariable: '--border', transform: 'hsl' },
  { themeLabToken: '--tl-color-border-base', shadcnVariable: '--input', transform: 'hsl' },
  { themeLabToken: '--tl-color-primary-base', shadcnVariable: '--ring', transform: 'hsl' },

  // Radius
  { themeLabToken: '--tl-borderRadius-md', shadcnVariable: '--radius', transform: 'none' },
];

/**
 * Generate CSS for shadcn-svelte adapter
 */
export function generateAdapterCSS(): string {
  const lines = [
    '/**',
    ' * shadcn-svelte Adapter Tokens',
    ' * Maps Theme Lab tokens to shadcn-svelte variables',
    ' * Generated file - use with @theme-lab/tokens',
    ' */',
    '',
    ':root {',
  ];

  for (const mapping of tokenMap) {
    if (mapping.transform === 'hsl') {
      // For HSL transform, we use CSS calc trick or expect pre-converted values
      lines.push(`  ${mapping.shadcnVariable}: var(${mapping.themeLabToken});`);
    } else {
      lines.push(`  ${mapping.shadcnVariable}: var(${mapping.themeLabToken});`);
    }
  }

  lines.push('}', '');

  return lines.join('\n');
}
