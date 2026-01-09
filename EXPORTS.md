# Theme Lab Exports

This document describes all export formats and how to use Theme Lab in different frameworks.

## Token Exports

### CSS Variables (`tokens.css`)

The primary token export. Use this for any project that supports CSS custom properties.

```css
/* Import in your app's main CSS or entry point */
@import '@theme-lab/tokens/tokens.css';

/* Or via link tag */
<link rel="stylesheet" href="node_modules/@theme-lab/tokens/dist/tokens.css">
```

All tokens are prefixed with `--tl-` to avoid conflicts:
- `--tl-color-*` — Color palette
- `--tl-spacing-*` — Spacing scale
- `--tl-typography-*` — Font families, sizes, weights
- `--tl-borderRadius-*` — Border radius values
- `--tl-shadow-*` — Box shadow definitions

### Dark Theme (`tokens.dark.css`)

Optional dark theme variables. Apply by using `[data-theme="dark"]` selector.

```html
<html data-theme="dark">
  <!-- Dark theme applied -->
</html>
```

### Tailwind Theme (`tailwind.theme.css`)

CSS-first theme export for Tailwind CSS v4.

```css
/* tailwind.config.css or your main CSS */
@import '@theme-lab/tokens/tailwind.theme.css';
```

---

## Web Components

### Installation

```bash
# npm
npm install @theme-lab/components @theme-lab/tokens

# bun
bun add @theme-lab/components @theme-lab/tokens
```

### Usage (Vanilla JS/HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@theme-lab/tokens/dist/tokens.css">
  <script type="module">
    import '@theme-lab/components';
  </script>
</head>
<body>
  <tl-button variant="primary">Click Me</tl-button>
  <tl-input placeholder="Enter text..."></tl-input>
  <tl-checkbox label="Accept terms"></tl-checkbox>
</body>
</html>
```

### Available Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Button | `<tl-button>` | Primary, secondary, ghost, outline variants |
| Input | `<tl-input>` | Text input with sizes and error state |
| Checkbox | `<tl-checkbox>` | Checkbox with label |
| Switch | `<tl-switch>` | Toggle switch |
| Card | `<tl-card>` | Container with slots for header/footer |
| Tooltip | `<tl-tooltip>` | Hover tooltip |
| Tabs | `<tl-tabs>` | Tabbed content |
| Badge | `<tl-badge>` | Status badges |

---

## Framework Integration

### Svelte 5 / SvelteKit

```svelte
<script>
  // Import tokens globally (in +layout.svelte or app.css)
  import '@theme-lab/tokens/tokens.css';
  
  // Import components
  import '@theme-lab/components';
</script>

<!-- Use web components directly -->
<tl-button variant="primary" on:click={handleClick}>
  Submit
</tl-button>

<tl-card>
  <h3 slot="header">Card Title</h3>
  <p>Card content goes here.</p>
</tl-card>
```

**SvelteKit Configuration:**

```js
// svelte.config.js
export default {
  compilerOptions: {
    // Allow custom elements
    customElement: true,
  },
  // ...
};
```

### React

```tsx
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';

// Declare types for custom elements (optional)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tl-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
          size?: 'sm' | 'md' | 'lg';
          disabled?: boolean;
        },
        HTMLElement
      >;
      // Add other components as needed
    }
  }
}

function App() {
  return (
    <>
      <tl-button variant="primary" onClick={() => console.log('clicked')}>
        Click Me
      </tl-button>
      
      <tl-input placeholder="Enter text..." />
    </>
  );
}
```

### Vue 3

```vue
<script setup>
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';
</script>

<template>
  <tl-button variant="primary" @click="handleClick">
    Submit
  </tl-button>
  
  <tl-checkbox
    :checked="accepted"
    label="I accept the terms"
    @change="accepted = $event.target.checked"
  />
</template>
```

**Vue Configuration:**

```js
// vite.config.js
export default {
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('tl-'),
      },
    },
  },
};
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}

// styles.css
@import '@theme-lab/tokens/tokens.css';

// component.ts
import '@theme-lab/components';
```

```html
<!-- component.html -->
<tl-button variant="primary" (click)="onClick()">
  Submit
</tl-button>
```

---

## Custom Theming

### Override Tokens at Runtime

```css
:root {
  /* Override primary color */
  --tl-color-primary-base: #10b981;
  --tl-color-primary-hover: #059669;
  
  /* Override spacing */
  --tl-spacing-4: 1.25rem;
}
```

### Use Theme Lab Addon

1. Start Storybook: `bun run dev`
2. Open the Theme Lab panel
3. Adjust tokens live
4. Export your customized CSS

---

## Bundle Formats

| Package | Format | Entry |
|---------|--------|-------|
| @theme-lab/tokens | CSS | `dist/tokens.css` |
| @theme-lab/tokens | CSS (dark) | `dist/tokens.dark.css` |
| @theme-lab/tokens | CSS (tailwind) | `dist/tailwind.theme.css` |
| @theme-lab/components | ESM | `dist/index.js` |

All packages are published as ES modules with TypeScript declarations.
