# Theme Lab

> A design system manager with live token editing, component preview, and multi-framework export.

## Overview

Theme Lab is a POC that enables:
- **Live token editing** — Tweak global design tokens and see updates across the component library in real-time
- **Per-component overrides** — Drill into each component and apply local token overrides
- **Multi-framework export** — Export themes (tokens) + web components for use in React, Svelte, Vue, Angular, or vanilla HTML
- **Library composition** — Integrate with existing UI libraries via Storybook Composition

## Quick Start

```bash
# Install dependencies
bun install

# Start Theme Lab Storybook
bun run dev

# Open http://localhost:6006
```

## Project Structure

```
/packages
  /tokens          # Design token source and generators
  /components      # Lit web components
  /adapters        # UI library adapters
    /shadcn-svelte
    
/apps
  /storybook       # Theme Lab Storybook (primary)
  /storybook-hub   # Composition hub with refs
  /examples        # Framework usage examples
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Theme Lab Storybook |
| `bun run dev:hub` | Start Storybook Hub |
| `bun run build` | Build all packages |
| `bun run tokens:build` | Generate token CSS files |
| `bun run lint` | Run linting |
| `bun run test` | Run tests |

## Token System

Tokens are defined in `/packages/tokens/tokens.json` and generate:
- `tokens.css` — CSS custom properties
- `tokens.dark.css` — Dark theme overrides
- `tailwind.theme.css` — Tailwind v4 theme

### Using Tokens

```css
.my-component {
  background-color: var(--tl-color-primary-base);
  padding: var(--tl-spacing-md);
  border-radius: var(--tl-radius-md);
}
```

## Web Components

Components are built with Lit and use light DOM for compatibility with Tailwind and other CSS frameworks.

```html
<tl-button variant="primary">Click me</tl-button>
<tl-input placeholder="Enter text" />
<tl-card>Content here</tl-card>
```

## Framework Integration

### React
```jsx
import '@theme-lab/components';
import '@theme-lab/tokens/tokens.css';

<tl-button variant="primary">Click</tl-button>
```

### Svelte 5
```svelte
<script>
  import '@theme-lab/components';
  import '@theme-lab/tokens/tokens.css';
</script>

<tl-button variant="primary">Click</tl-button>
```

### Vue 3
```vue
<script setup>
import '@theme-lab/components';
import '@theme-lab/tokens/tokens.css';
</script>

<template>
  <tl-button variant="primary">Click</tl-button>
</template>
```

## Adding Components

1. Create component in `/packages/components/src/{name}/`
2. Follow Lit template with light DOM
3. Consume tokens via CSS variables
4. Add Storybook stories
5. Export from package index

See `.cursor/prompts/implement-component.md` for detailed guide.

## Adding Tokens

1. Add to `/packages/tokens/tokens.json`
2. Run `bun run tokens:build`
3. Update components if needed

See `.cursor/prompts/add-token.md` for detailed guide.

## Adapters

Adapters integrate Theme Lab with existing UI libraries:
- **shadcn-svelte** — Svelte 5 component library

See `/packages/adapters/*/README.md` for adapter-specific documentation.

## Development

### Prerequisites
- Bun 1.1+
- Node.js 20+ (for some tooling)

### Milestone Branches
- `poc/m0-foundation` — Workspace setup
- `poc/m1-tokens` — Token pipeline
- `poc/m2-wc-components` — Web components
- `poc/m3-theme-lab-addon` — Storybook addon
- `poc/m4-storybook-hub` — Composition hub
- `poc/m5-framework-examples` — Usage examples

## License

MIT
