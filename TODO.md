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
- [x] Initialize git repository
- [x] Create bun workspace configuration
- [x] Set up monorepo package structure

### Packages
- [x] Create `/packages/tokens` package skeleton
- [x] Create `/packages/components` package skeleton
- [x] Create `/packages/adapters` directory

### Apps
- [x] Create `/apps/storybook` with Web Components renderer
- [x] Verify Storybook starts with placeholder story
- [x] Create `/apps/storybook-hub` skeleton

### Scripts
- [x] `bun run dev` starts theme lab storybook
- [x] `bun run build` builds all packages
- [x] `bun run lint` runs linting
- [x] `bun run test` runs tests

### CI/CD
- [x] Create GitHub Actions workflow
- [ ] CI runs `bun install` (pending first run)
- [ ] CI runs `bun run lint` (pending first run)
- [ ] CI runs `bun run test` (pending first run)
- [ ] CI runs `bun run build` (pending first run)

### Documentation
- [x] Create TODO.md
- [x] Create WORKLOG.md
- [x] Create README.md

---

## Milestone 1: Token Pipeline ✅
**Branch:** `poc/m1-tokens`  
**Goal:** Token schema + generators + deterministic output

### Token System
- [x] Create `tokens.json` canonical source
- [x] Define token schema (colors, spacing, typography, etc.)
- [x] Create token validation script with JSON Schema (Ajv)

### Generators
- [x] Generate `tokens.css` (CSS custom properties)
- [x] Generate `tokens.dark.css` (dark theme)
- [x] Generate `tailwind.theme.css` (Tailwind v4 theme)

### Testing
- [x] Create snapshot tests for generated outputs
- [x] Verify deterministic generation
- [x] Document token addition process (README.md)

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
