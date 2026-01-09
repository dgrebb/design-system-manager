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
  /tokens          # Design token source and generators (111 tokens)
  /components      # Lit web components (8 components)
  /adapters        # UI library adapters
    /shadcn-svelte # Svelte adapter skeleton
    
/apps
  /storybook       # Theme Lab Storybook (primary, port 6006)
  /storybook-hub   # Composition hub with refs (port 6010)
  
/examples
  /svelte          # Svelte 5 usage example
  /react           # React 19 usage example
  /vue             # Vue 3 usage example
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Theme Lab Storybook |
| `bun run dev:hub` | Start Storybook Hub |
| `bun run dev:all` | Start both (Theme Lab + Hub) |
| `bun run build` | Build all packages |
| `bun run tokens:build` | Generate token CSS files |
| `bun run tokens:validate` | Validate tokens.json |
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
  padding: var(--tl-spacing-4);
  border-radius: var(--tl-borderRadius-md);
  font-family: var(--tl-typography-fontFamily-sans);
}
```

## Web Components

Components are built with Lit and use Shadow DOM with CSS variable inheritance.

| Component | Tag | Description |
|-----------|-----|-------------|
| Button | `<tl-button>` | Primary, secondary, ghost, outline variants |
| Input | `<tl-input>` | Text input with sizes and error state |
| Checkbox | `<tl-checkbox>` | Checkbox with label |
| Switch | `<tl-switch>` | Toggle switch |
| Card | `<tl-card>` | Container with header/footer slots |
| Tooltip | `<tl-tooltip>` | Hover tooltip |
| Tabs | `<tl-tabs>` | Tabbed content |
| Badge | `<tl-badge>` | Status badges |

### Example Usage

```html
<tl-button variant="primary" size="md">Click me</tl-button>
<tl-input placeholder="Enter text" size="lg" />
<tl-card>
  <h3 slot="header">Title</h3>
  <p>Content here</p>
</tl-card>
```

## Theme Lab Addon

The Theme Lab panel in Storybook allows:
- **Live token editing** with color pickers and text inputs
- **Preset management** — Save/load custom presets (localStorage)
- **Built-in presets** — Default, Dark Mode, High Contrast
- **Export** — Copy CSS or download theme overrides

## Framework Integration

See [EXPORTS.md](./EXPORTS.md) for comprehensive documentation.

### React

```tsx
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';

function App() {
  return <tl-button variant="primary">Click</tl-button>;
}
```

### Svelte 5 / SvelteKit

```svelte
<script>
  import '@theme-lab/tokens/tokens.css';
  import '@theme-lab/components';
</script>

<tl-button variant="primary">Click</tl-button>
```

### Vue 3

```vue
<script setup>
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';
</script>

<template>
  <tl-button variant="primary">Click</tl-button>
</template>
```

## Storybook Hub

The Hub composes multiple Storybooks:

```bash
# Start Theme Lab first
bun run dev

# Then start Hub
bun run dev:hub

# Open http://localhost:6010
```

The Hub shows:
- Theme Lab components (from localhost:6006)
- Documentation on adding adapters
- Future: Additional library refs

## Adding Components

1. Create component in `/packages/components/src/{name}/`
2. Use Lit with Shadow DOM
3. Consume tokens via CSS variables  
4. Add Storybook stories
5. Export from package index

See `.cursor/prompts/implement-component.md` for detailed guide.

## Adding Tokens

1. Add to `/packages/tokens/tokens.json`
2. Run `bun run tokens:build`
3. Run `bun run test` to update snapshots
4. Update components if needed

See `.cursor/prompts/add-token.md` for detailed guide.

## Development

### Prerequisites
- Bun 1.1+
- Node.js 20+ (for some tooling)

### Milestone Branches
- `poc/m0-foundation` — Workspace setup ✅
- `poc/m1-tokens` — Token pipeline ✅
- `poc/m2-wc-components` — Web components ✅
- `poc/m3-theme-lab-addon` — Storybook addon ✅
- `poc/m4-storybook-hub` — Composition hub ✅
- `poc/m5-framework-examples` — Usage examples ✅

### Architecture

```
tokens.json
    ↓ (generate.ts)
tokens.css + tokens.dark.css + tailwind.theme.css
    ↓
Web Components (Lit, Shadow DOM)
    ↓
Storybook (preview + Theme Lab addon)
    ↓
Framework apps (React, Svelte, Vue, Angular)
```

## License

MIT
