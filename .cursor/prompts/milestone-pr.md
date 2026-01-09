# Create Milestone PR

## Context
You are creating a Draft PR for a Theme Lab POC milestone.

## Branch Naming

```
poc/m0-foundation
poc/m1-tokens
poc/m2-wc-components
poc/m3-theme-lab-addon
poc/m4-storybook-hub
poc/m5-framework-examples
```

## PR Title Format

```
POC M{N}: {Short Milestone Name}
```

Examples:
- `POC M0: Foundation`
- `POC M1: Token Pipeline`
- `POC M2: Web Components`

## PR Body Template

```markdown
## Goals

- Goal 1
- Goal 2
- Goal 3

## What Changed

- Change 1
- Change 2
- Change 3

## How to Run / Verify

\`\`\`bash
bun install
bun run dev
# Then open http://localhost:6006
\`\`\`

## Checklist

- [ ] `bun install` works clean
- [ ] Lint passes: `bun run lint`
- [ ] Tests pass: `bun run test`
- [ ] Build succeeds: `bun run build`
- [ ] Feature works as described

## Screenshots/Recordings

(Add if UI changes exist)

## Notes

Any additional context or known issues.
```

## Commit Message Format

```
M{N}: {description}

Examples:
M0: initialize bun workspace
M1: add token schema and generators
M2: implement Button component
M3: storybook addon panel for token editing
```

## Before Creating PR

- [ ] All changes committed
- [ ] Branch pushed to origin
- [ ] TODO.md updated with completed tasks
- [ ] WORKLOG.md updated with session notes
- [ ] CI should pass (or known issues documented)
