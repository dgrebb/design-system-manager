# shadcn-svelte Adapter

Integrates Theme Lab design tokens with [shadcn-svelte](https://www.shadcn-svelte.com/).

## Overview

This adapter maps Theme Lab tokens to shadcn-svelte's CSS variable system, enabling consistent theming across both libraries.

## Token Mapping

| Theme Lab Token | shadcn-svelte Variable | Notes |
|-----------------|------------------------|-------|
| `--tl-color-primary-base` | `--primary` | Direct mapping |
| `--tl-color-primary-foreground` | `--primary-foreground` | Direct mapping |
| `--tl-color-secondary-base` | `--secondary` | Direct mapping |
| `--tl-color-background-base` | `--background` | Direct mapping |
| `--tl-color-foreground-base` | `--foreground` | Direct mapping |
| `--tl-color-border-base` | `--border` | Direct mapping |
| `--tl-borderRadius-md` | `--radius` | Base radius value |

## Known Mismatches

### Color Format
- Theme Lab uses hex colors (`#3b82f6`)
- shadcn-svelte uses HSL values (`222.2 47.4% 11.2%`)
- Adapter converts hex to HSL automatically

### Variants
- Theme Lab: `variant="primary"`, `variant="secondary"`
- shadcn-svelte: uses Tailwind classes directly

### Radius Scale
- Theme Lab has granular scale (`sm`, `md`, `lg`, `xl`)
- shadcn-svelte uses a single `--radius` base value

## Installation

```bash
bun add @theme-lab/adapter-shadcn-svelte
```

## Usage

### Import the adapter tokens

```css
/* In your global CSS */
@import '@theme-lab/tokens/tokens.css';
@import '@theme-lab/adapter-shadcn-svelte/tokens.css';
```

### With SvelteKit

```svelte
<!-- +layout.svelte -->
<script>
  import '@theme-lab/tokens/tokens.css';
  import '@theme-lab/adapter-shadcn-svelte/tokens.css';
</script>

<slot />
```

## Preview in Hub

1. Start the adapter storybook: `bun run dev:adapters`
2. Start the hub: `bun run dev:hub`
3. View at http://localhost:6010

## Automation Scope

### Automated
- Token injection via CSS variables
- HSL color conversion
- Base radius mapping

### Manual Required
- Tailwind class customization
- Component-specific variant props
- Complex responsive patterns

## Development

```bash
# Build the adapter
bun run --filter @theme-lab/adapter-shadcn-svelte build

# Watch for changes
bun run --filter @theme-lab/adapter-shadcn-svelte dev
```
