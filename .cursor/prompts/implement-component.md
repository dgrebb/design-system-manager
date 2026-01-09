# Implement Web Component

## Context
You are implementing a new web component for the Theme Lab design system.

## Instructions

1. Create the component in `/packages/components/src/{component-name}/`
2. Follow the Lit component template from `.cursor/rules/components.mdc`
3. Use light DOM (no shadow DOM) for Tailwind compatibility
4. Consume design tokens via CSS variables (`--tl-*` prefix)
5. Implement all required variants and sizes
6. Add proper TypeScript types
7. Create comprehensive Storybook stories
8. Ensure accessibility: focus states, keyboard nav, ARIA attributes

## Component Checklist

- [ ] Component file with Lit decorators
- [ ] Styles consuming `--tl-*` CSS variables
- [ ] TypeScript interface for props
- [ ] Default story
- [ ] Variant stories
- [ ] Size stories
- [ ] Disabled/loading states if applicable
- [ ] Keyboard interaction
- [ ] ARIA attributes
- [ ] Export from package index

## Example Usage

```bash
# After implementation, verify:
bun run build
bun run dev  # Check in Storybook
```
