# Vue 3 + Theme Lab Example

This example demonstrates using Theme Lab web components with Vue 3.

## Setup

1. Create a new Vue project:

```bash
bunx create-vue my-app
cd my-app
```

2. Install Theme Lab packages:

```bash
bun add @theme-lab/components @theme-lab/tokens
```

3. Import tokens in your entry point (`main.ts`):

```ts
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';
```

## Vue Configuration

Tell Vue to treat `tl-*` elements as custom elements:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('tl-'),
        },
      },
    }),
  ],
});
```

## Event Handling

Use Vue's `@` syntax for events:

```vue
<tl-button @click="handleClick">Submit</tl-button>

<tl-input @input="(e) => (value = e.target.value)" />

<tl-checkbox @change="(e) => (checked = e.target.checked)" />
```

## Reactivity

Two-way binding with custom elements requires manual handling:

```vue
<script setup>
import { ref } from 'vue';

const inputValue = ref('');
</script>

<template>
  <tl-input
    :value="inputValue"
    @input="(e) => (inputValue = e.target.value)"
  />
</template>
```

## Slots

Vue slots work with web component slots:

```vue
<tl-card>
  <template #header>
    <h3>Card Title</h3>
  </template>
  
  <p>Main content</p>
  
  <template #footer>
    <tl-button>Action</tl-button>
  </template>
</tl-card>
```

Or use the `slot` attribute directly:

```vue
<tl-card>
  <h3 slot="header">Card Title</h3>
  <p>Main content</p>
  <div slot="footer">
    <tl-button>Action</tl-button>
  </div>
</tl-card>
```

## Styling with Tokens

Access CSS variables in your styles:

```vue
<style scoped>
.container {
  font-family: var(--tl-typography-fontFamily-sans);
  background: var(--tl-color-background-base);
  padding: var(--tl-spacing-4);
  border-radius: var(--tl-borderRadius-md);
}
</style>
```
