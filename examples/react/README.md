# React + Theme Lab Example

This example demonstrates using Theme Lab web components with React.

## Setup

1. Create a new React project:

```bash
bunx create-vite my-app --template react-ts
cd my-app
```

2. Install Theme Lab packages:

```bash
bun add @theme-lab/components @theme-lab/tokens
```

3. Import tokens in your main entry (`main.tsx` or `App.tsx`):

```tsx
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';
```

## TypeScript Declarations

Add type declarations for web components to get IntelliSense:

```tsx
// types/theme-lab.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tl-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
        size?: 'sm' | 'md' | 'lg';
        disabled?: boolean;
      };
      // Add other components...
    }
  }
}
```

## Event Handling

Web component events use standard DOM event handling:

```tsx
<tl-button onClick={() => console.log('clicked')}>
  Submit
</tl-button>

<tl-input onInput={(e: any) => setValue(e.target.value)} />

<tl-checkbox onChange={(e: any) => setChecked(e.target.checked)} />
```

## Slots

Use the `slot` attribute for named slots:

```tsx
<tl-card>
  <h3 slot="header">Card Title</h3>
  <p>Main content here</p>
  <div slot="footer">
    <tl-button>Action</tl-button>
  </div>
</tl-card>
```

## Styling with Tokens

Use CSS variables anywhere:

```tsx
const styles = {
  container: {
    fontFamily: 'var(--tl-typography-fontFamily-sans)',
    color: 'var(--tl-color-foreground-base)',
    padding: 'var(--tl-spacing-4)',
  },
};
```

## Dark Mode

Toggle dark mode via `data-theme` attribute:

```tsx
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```
