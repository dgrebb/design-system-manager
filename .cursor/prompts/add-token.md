# Add Design Token

## Context
You are adding a new design token to the Theme Lab token system.

## Instructions

1. Add the token to `/packages/tokens/tokens.json`
2. Follow existing naming conventions and structure
3. Run token generation to update CSS outputs
4. Update components that should use the new token
5. Document the addition in WORKLOG.md

## Token Naming Convention

```
Category → Subcategory → Variant

color.primary.base
color.primary.hover
spacing.md
typography.fontSize.base
borderRadius.md
shadow.lg
```

## CSS Variable Output

```
--tl-{category}-{subcategory}-{variant}

--tl-color-primary-base
--tl-spacing-md
--tl-font-size-base
```

## Verification Steps

```bash
bun run tokens:build
bun run tokens:validate
bun run test  # Snapshot tests should update
bun run dev   # Verify in Storybook
```

## Checklist

- [ ] Token added to tokens.json
- [ ] Generated CSS files updated
- [ ] Dark theme variant if applicable
- [ ] Tailwind theme export updated
- [ ] Components updated if needed
- [ ] WORKLOG.md updated
