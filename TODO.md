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

## Milestone 2: Web Components ✅
**Branch:** `poc/m2-wc-components`  
**Goal:** 8-12 components consuming tokens

### Core Components
- [x] Button (primary, secondary, ghost, outline)
- [x] Input (text, password, email)
- [x] Checkbox (default, indeterminate)
- [x] Switch
- [ ] Select (single, searchable) — deferred to M3
- [x] Card (default, interactive)
- [ ] Dialog/Modal — deferred to M3
- [x] Tooltip

### Optional Components
- [x] Tabs
- [x] Badge
- [ ] Avatar — deferred
- [ ] Alert — deferred

### Quality
- [x] Storybook stories for all components
- [x] Accessibility basics (focus, keyboard)
- [x] Token changes affect visuals globally

### Additional
- [x] Upgraded Storybook to v10.1.11
- [x] Added addon-a11y for accessibility testing
- [x] Fixed Shadow DOM rendering for proper slot behavior

---

## Milestone 3: Theme Lab Addon ✅
**Branch:** `poc/m3-theme-lab-addon`  
**Goal:** Global token editor + per-story overrides + export UI

### Addon Panel
- [x] Create Storybook addon structure
- [x] Color picker controls
- [x] Slider/number inputs for spacing
- [x] Text inputs for fonts/typography

### Preset System
- [x] Save preset to localStorage
- [x] Load preset from localStorage
- [x] Built-in presets (Default, Dark, High Contrast)

### Export
- [x] Export CSS overrides button (Copy CSS)
- [x] Download CSS button
- [ ] Export full `tokens.css` — deferred
- [ ] Export `tailwind.theme.css` — deferred

### Decorators
- [x] Per-story local override decorator (withThemeLab)
- [x] Story parameter for token overrides (parameters.themeLab.tokens)

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
