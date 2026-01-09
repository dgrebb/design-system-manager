# GitHub Copilot Instructions

## Project Overview

This is a Theme Lab POC — a design system manager that enables:
- Live tweaking of global design tokens with real-time Storybook updates
- Per-component local overrides
- Multi-framework export (tokens + web components)
- Storybook Composition for UI library integrations

## Toolchain

- **Runtime**: Bun (workspace, installs, scripts, tasks)
- **Language**: TypeScript everywhere
- **Structure**: Monorepo with `/packages` and `/apps`
- **Components**: Web Components (Lit 3.x, light DOM preferred)
- **Preview**: Storybook (Web Components renderer)
- **Tokens**: CSS variables at runtime

## Code Conventions

### TypeScript
- Strict mode enabled
- Explicit return types on public APIs
- Use `type` for object shapes, `interface` for extendable contracts

### Web Components (Lit)
- Use decorators: `@customElement`, `@property`, `@state`
- Light DOM by default for Tailwind compatibility
- Shadow DOM only with explicit flag

```typescript
@customElement('tl-button')
export class TlButton extends LitElement {
  protected createRenderRoot() {
    return this; // Light DOM
  }
  
  @property({ type: String }) variant: 'primary' | 'secondary' = 'primary';
  
  render() {
    return html`<button class="tl-button tl-button--${this.variant}"><slot></slot></button>`;
  }
}
```

### Token Usage
- Always use CSS variables with `--tl-` prefix
- Never hardcode colors, spacing, or other design values

```css
.tl-button {
  background-color: var(--tl-color-primary-base);
  padding: var(--tl-spacing-sm) var(--tl-spacing-md);
  border-radius: var(--tl-radius-md);
}
```

### Svelte 5 Patterns
When working with Svelte:
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- Render component variables directly: `<Thing />`
- NO legacy `<svelte:component>` patterns

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

## File Structure

```
/packages
  /tokens          # Token source and generators
  /components      # Lit web components
  /adapters        # UI library adapters
    /shadcn-svelte
    /nuxt-ui
/apps
  /storybook       # Theme Lab Storybook
  /storybook-hub   # Composition hub
  /examples
    /react
    /svelte
    /vue
    /angular
```

## Commit Messages

Reference milestone in commits:
- `M0: initialize bun workspace`
- `M1: add token schema and generators`
- `M2: implement Button component`

## Required Files

Always maintain:
- `TODO.md` — Canonical task checklist
- `WORKLOG.md` — Append-only engineering log

## Key Patterns

### Adding a Token
1. Add to `/packages/tokens/tokens.json`
2. Run `bun run tokens:build`
3. Use in components via CSS variable

### Adding a Component
1. Create in `/packages/components/src/{name}/`
2. Follow Lit template with light DOM
3. Consume tokens via CSS variables
4. Add Storybook stories
5. Export from package index

### Creating an Adapter
1. Create in `/packages/adapters/{library}/`
2. Map tokens to library's variables
3. Document mismatches in README
4. Add to Storybook Hub

## Quality Standards

- Accessibility first: focus states, keyboard nav, ARIA
- Token-driven styling: no hardcoded design values
- Small, reviewable diffs
- Document decisions in WORKLOG.md
