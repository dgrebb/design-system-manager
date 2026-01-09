# @theme-lab/tokens

Design tokens for Theme Lab — the single source of truth for colors, spacing, typography, and other design values.

## Overview

This package contains:
- `tokens.json` — Canonical token definitions
- `token-schema.json` — JSON Schema for validation
- Generator scripts that output CSS files

## Generated Outputs

| File | Description |
|------|-------------|
| `dist/tokens.css` | CSS custom properties for all tokens |
| `dist/tokens.dark.css` | Dark theme overrides |
| `dist/tailwind.theme.css` | Tailwind v4 CSS-first theme |

## Usage

### Install
```bash
bun add @theme-lab/tokens
```

### Import in CSS
```css
@import '@theme-lab/tokens/tokens.css';
@import '@theme-lab/tokens/tokens.dark.css'; /* optional */
```

### Import in JavaScript
```typescript
import '@theme-lab/tokens/tokens.css';
```

### Use CSS Variables
```css
.my-component {
  background-color: var(--tl-color-primary-base);
  padding: var(--tl-spacing-4);
  border-radius: var(--tl-borderRadius-md);
  font-family: var(--tl-typography-fontFamily-sans);
}
```

## Token Structure

### Colors
```
--tl-color-{category}-{variant}

Categories: primary, secondary, neutral, success, warning, error, background, foreground, border
Variants: base, hover, active, foreground (for action colors)
         50-950 (for neutral scale)
         base, muted, subtle (for background/foreground/border)
```

### Spacing
```
--tl-spacing-{scale}

Scale: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24
       Also: px, 0.5, 1.5, 2.5, 3.5
```

### Typography
```
--tl-typography-fontFamily-{type}     (sans, mono)
--tl-typography-fontSize-{size}       (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
--tl-typography-fontWeight-{weight}   (normal, medium, semibold, bold)
--tl-typography-lineHeight-{name}     (none, tight, snug, normal, relaxed, loose)
--tl-typography-letterSpacing-{name}  (tighter, tight, normal, wide, wider)
```

### Border Radius
```
--tl-borderRadius-{size}

Sizes: none, sm, md, lg, xl, 2xl, full
```

### Shadows
```
--tl-shadow-{size}

Sizes: none, sm, md, lg, xl
```

### Transitions
```
--tl-transition-{speed}

Speeds: none, fast (150ms), normal (200ms), slow (300ms)
```

### Z-Index
```
--tl-zIndex-{level}

Levels: 0, 10, 20, 30, 40, 50, dropdown, modal, tooltip
```

## Adding New Tokens

1. **Edit `tokens.json`** following the existing structure
2. **Validate** your changes:
   ```bash
   bun run validate
   ```
3. **Generate** new CSS:
   ```bash
   bun run build
   ```
4. **Update snapshots** if needed:
   ```bash
   bun test --update-snapshots
   ```

### Example: Adding a New Color

```json
{
  "color": {
    "accent": {
      "base": "#8b5cf6",
      "hover": "#7c3aed",
      "active": "#6d28d9",
      "foreground": "#ffffff"
    }
  }
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run build` | Generate all CSS outputs |
| `bun run watch` | Watch and regenerate on changes |
| `bun run validate` | Validate tokens against schema |
| `bun test` | Run tests including snapshot tests |

## Validation

The validator checks:
1. **Schema compliance** — Structure matches `token-schema.json`
2. **Semantic rules** — Required sizes exist, scales are consistent
3. **No duplicates** — CSS variable names are unique

## Dark Theme

Dark theme is applied via:
- `.dark` class on root element
- `data-theme="dark"` attribute
- `prefers-color-scheme: dark` media query (auto)

```html
<!-- Manual dark mode -->
<html class="dark">

<!-- Or with data attribute -->
<html data-theme="dark">

<!-- Auto dark mode works out of the box -->
```

## Tailwind Integration

Import the generated theme in your Tailwind CSS:

```css
@import '@theme-lab/tokens/tokens.css';
@import '@theme-lab/tokens/tailwind.theme.css';
@import 'tailwindcss';
```

Then use Tailwind utilities with Theme Lab colors:
```html
<button class="bg-primary text-primary-foreground rounded-md">
  Click me
</button>
```

## Architecture

```
tokens.json (source of truth)
     ↓
  generate.ts
     ↓
├── tokens.css         (CSS custom properties)
├── tokens.dark.css    (dark theme overrides)
└── tailwind.theme.css (Tailwind v4 @theme)
```

All generation is deterministic — same input always produces same output.
