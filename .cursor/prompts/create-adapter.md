# Create UI Library Adapter

## Context
You are creating an adapter to integrate an external UI library with Theme Lab tokens.

## Instructions

1. Create adapter package in `/packages/adapters/{library-name}/`
2. Map Theme Lab tokens to library's CSS variables/theme system
3. Document known mismatches and manual steps
4. Create adapter-specific Storybook stories
5. Add to Storybook Hub composition

## Adapter Structure

```
packages/adapters/{library}/
├── README.md           # Integration guide
├── src/
│   ├── token-map.ts   # Token → library variable mapping
│   ├── variants.ts    # Variant/prop mapping
│   └── index.ts       # Exports
├── stories/           # Adapter-specific stories
├── package.json
└── tsconfig.json
```

## Token Mapping Template

```typescript
export const tokenMap: Record<string, string> = {
  // Colors
  '--tl-color-primary-base': '--{lib}-primary',
  '--tl-color-secondary-base': '--{lib}-secondary',
  
  // Spacing
  '--tl-spacing-sm': '--{lib}-space-2',
  '--tl-spacing-md': '--{lib}-space-4',
  
  // Radius
  '--tl-radius-md': '--{lib}-radius',
};
```

## README Template

Document:
- Overview of the integration
- Token mapping table
- Known mismatches (variants, classes, scales)
- How to preview in hub
- What is automated vs manual

## Checklist

- [ ] Package created with proper structure
- [ ] token-map.ts with complete mappings
- [ ] README.md with documentation
- [ ] Storybook stories demonstrating integration
- [ ] Added to storybook-hub refs
- [ ] TODO.md and WORKLOG.md updated
