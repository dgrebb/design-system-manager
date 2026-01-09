import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Hub/Introduction',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Welcome: Story = {
  render: () => html`
    <div style="font-family: system-ui, sans-serif; max-width: 800px; padding: 2rem;">
      <h1 style="margin-top: 0; color: #1e293b;">🎨 Theme Lab Hub</h1>
      
      <p style="font-size: 1.1rem; color: #475569; line-height: 1.6;">
        Welcome to the Theme Lab Hub! This is a composition of multiple Storybooks,
        bringing together your design system components and adapter libraries.
      </p>
      
      <h2 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">
        Available Libraries
      </h2>
      
      <div style="display: grid; gap: 1rem; margin-top: 1rem;">
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem; color: #1e293b;">
            🧪 Theme Lab (Core)
          </h3>
          <p style="margin: 0; color: #64748b;">
            The primary Web Components library with token-driven styling.
            Includes Button, Input, Checkbox, Switch, Card, Tooltip, Tabs, and Badge.
          </p>
        </div>
        
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; opacity: 0.7;">
          <h3 style="margin: 0 0 0.5rem; color: #1e293b;">
            🎭 shadcn-svelte Adapter
          </h3>
          <p style="margin: 0; color: #64748b;">
            Token mapping for shadcn-svelte components. 
            <em>(Coming soon)</em>
          </p>
        </div>
      </div>
      
      <h2 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 2rem;">
        How It Works
      </h2>
      
      <ol style="color: #475569; line-height: 1.8;">
        <li>Use the <strong>sidebar</strong> to navigate between different library storybooks</li>
        <li>Each library's stories appear under its own section</li>
        <li>Use the <strong>Theme Lab</strong> panel to edit tokens globally</li>
        <li>Export your customized theme when ready</li>
      </ol>
      
      <div style="margin-top: 2rem; padding: 1rem; background: #f1f5f9; border-radius: 8px;">
        <p style="margin: 0; font-size: 0.9rem; color: #64748b;">
          <strong>💡 Tip:</strong> Start the Theme Lab storybook on port 6006 before launching the Hub
          to see the composed storybooks.
        </p>
      </div>
    </div>
  `,
};

export const GettingStarted: Story = {
  render: () => html`
    <div style="font-family: system-ui, sans-serif; max-width: 800px; padding: 2rem;">
      <h1 style="margin-top: 0; color: #1e293b;">🚀 Getting Started</h1>
      
      <h2 style="color: #334155;">Running the Hub</h2>
      
      <pre style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto;">
<code># Start the Theme Lab first (in one terminal)
bun run dev

# Then start the Hub (in another terminal)  
bun run --filter @theme-lab/storybook-hub dev</code></pre>
      
      <h2 style="color: #334155; margin-top: 2rem;">Adding an Adapter</h2>
      
      <p style="color: #475569; line-height: 1.6;">
        To add a new adapter library to the Hub:
      </p>
      
      <ol style="color: #475569; line-height: 1.8;">
        <li>Create the adapter package under <code>/packages/adapters/</code></li>
        <li>Set up a Storybook for the adapter with its own port</li>
        <li>Add a ref in the Hub's <code>main.ts</code> configuration</li>
        <li>Document the token mapping in the adapter's README</li>
      </ol>
      
      <pre style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto;">
<code>// apps/storybook-hub/.storybook/main.ts
refs: {
  'theme-lab': {
    title: 'Theme Lab',
    url: 'http://localhost:6006',
  },
  'shadcn-svelte': {
    title: 'shadcn-svelte Adapter',
    url: 'http://localhost:6007',
  },
}</code></pre>
    </div>
  `,
};
