# Theme Lab POC - Task Tracker

> Canonical checklist organized by milestone. Update this file with every PR.

---

## Milestone 0: Foundation
**Branch:** `poc/m0-foundation`  
**Goal:** Bun workspace + baseline scripts + CI + initial Storybook boots

### Setup
- [x] Create project documentation structure
- [x] Set up Cursor IDE rules and prompts
- [x] Set up VSCode configuration
- [x] Create GitHub Copilot instructions
- [ ] Initialize git repository
- [ ] Create bun workspace configuration
- [ ] Set up monorepo package structure

### Packages
- [ ] Create `/packages/tokens` package skeleton
- [ ] Create `/packages/components` package skeleton
- [ ] Create `/packages/adapters` directory

### Apps
- [ ] Create `/apps/storybook` with Web Components renderer
- [ ] Verify Storybook starts with placeholder story
- [ ] Create `/apps/storybook-hub` skeleton

### Scripts
- [ ] `bun run dev` starts theme lab storybook
- [ ] `bun run build` builds all packages
- [ ] `bun run lint` runs linting
- [ ] `bun run test` runs tests

### CI/CD
- [ ] Create GitHub Actions workflow
- [ ] CI runs `bun install`
- [ ] CI runs `bun run lint`
- [ ] CI runs `bun run test`
- [ ] CI runs `bun run build`

### Documentation
- [x] Create TODO.md
- [x] Create WORKLOG.md
- [ ] Create README.md

---

## Milestone 1: Token Pipeline
**Branch:** `poc/m1-tokens`  
**Goal:** Token schema + generators + deterministic output

### Token System
- [ ] Create `tokens.json` canonical source
- [ ] Define token schema (colors, spacing, typography, etc.)
- [ ] Create token validation script

### Generators
- [ ] Generate `tokens.css` (CSS custom properties)
- [ ] Generate `tokens.dark.css` (dark theme)
- [ ] Generate `tailwind.theme.css` (Tailwind v4 theme)

### Testing
- [ ] Create snapshot tests for generated outputs
- [ ] Verify deterministic generation
- [ ] Document token addition process

---

## Milestone 2: Web Components
**Branch:** `poc/m2-wc-components`  
**Goal:** 8-12 components consuming tokens

### Core Components
- [ ] Button (primary, secondary, ghost, outline)
- [ ] Input (text, password, email)
- [ ] Checkbox (default, indeterminate)
- [ ] Switch
- [ ] Select (single, searchable)
- [ ] Card (default, interactive)
- [ ] Dialog/Modal
- [ ] Tooltip

### Optional Components
- [ ] Tabs
- [ ] Badge
- [ ] Avatar
- [ ] Alert

### Quality
- [ ] Storybook stories for all components
- [ ] Accessibility basics (focus, keyboard)
- [ ] Token changes affect visuals globally

---

## Milestone 3: Theme Lab Addon
**Branch:** `poc/m3-theme-lab-addon`  
**Goal:** Global token editor + per-story overrides + export UI

### Addon Panel
- [ ] Create Storybook addon structure
- [ ] Color picker controls
- [ ] Slider/number inputs for spacing
- [ ] Text inputs for fonts

### Preset System
- [ ] Save preset to localStorage
- [ ] Load preset from localStorage
- [ ] Built-in presets (Default, Dark, High Contrast)

### Export
- [ ] Export `tokens.css` button
- [ ] Export `tokens.dark.css` button
- [ ] Export `tailwind.theme.css` button
- [ ] Copy to clipboard option

### Decorators
- [ ] Per-story local override decorator
- [ ] Story parameter for token overrides

---

## Milestone 4: Storybook Hub
**Branch:** `poc/m4-storybook-hub`  
**Goal:** Composition + dropdown to switch base library emphasis

### Composition
- [ ] Configure storybook refs
- [ ] Add theme-lab storybook ref
- [ ] Add adapter storybook refs

### Base Library Selector
- [ ] Toolbar addon for library switching
- [ ] Filter/group by library

### Adapters
- [ ] shadcn-svelte adapter (primary)
- [ ] Second adapter (optional)

---

## Milestone 5: Framework Examples
**Branch:** `poc/m5-framework-examples`  
**Goal:** Demonstrate consumption + export patterns

### Examples
- [ ] React example app
- [ ] Svelte 5 / SvelteKit example
- [ ] Vue 3 example
- [ ] Angular example

### Documentation
- [ ] EXPORTS.md describing all exports
- [ ] Usage documentation per framework
- [ ] Universal web component usage guide

---

## Completion Checklist

- [ ] All milestones complete
- [ ] README.md explains full usage
- [ ] TODO.md reflects completion state
- [ ] WORKLOG.md is up to date
- [ ] All Draft PRs merged or finalized
