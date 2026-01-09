# Svelte 5 + Theme Lab Example

This example demonstrates using Theme Lab web components with Svelte 5.

## Setup

1. Create a new SvelteKit project:

```bash
bunx sv create my-app
cd my-app
```

2. Install Theme Lab packages:

```bash
bun add @theme-lab/components @theme-lab/tokens
```

3. Import tokens in your root layout (`src/routes/+layout.svelte`):

```svelte
<script>
  import '@theme-lab/tokens/tokens.css';
  import '@theme-lab/components';
</script>

<slot />
```

4. Use components anywhere:

```svelte
<tl-button variant="primary">Click Me</tl-button>
```

## Svelte 5 Runes

Theme Lab works seamlessly with Svelte 5 runes:

```svelte
<script>
  let checked = $state(false);
</script>

<tl-switch
  checked={checked}
  onchange={(e) => (checked = e.target.checked)}
  label="Enable feature"
/>
```

## Event Handling

Web component events work with standard DOM event syntax:

```svelte
<tl-button onclick={() => console.log('clicked')}>
  Submit
</tl-button>

<!-- Or with Svelte's on: directive (deprecated in Svelte 5) -->
<tl-button on:click={() => console.log('clicked')}>
  Submit
</tl-button>
```

## Slots

Use named slots for complex components:

```svelte
<tl-card>
  <h3 slot="header">Card Title</h3>
  <p>Main content here</p>
  <div slot="footer">
    <tl-button>Action</tl-button>
  </div>
</tl-card>
```

## SvelteKit Config

No special configuration required! Web components work out of the box.

If you see warnings about unknown elements, add to `svelte.config.js`:

```js
export default {
  compilerOptions: {
    customElement: (name) => name.startsWith('tl-'),
  },
};
```
