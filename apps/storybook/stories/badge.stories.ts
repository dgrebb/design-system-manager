import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'outline'],
      description: 'Badge variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Show status dot',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    dot: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <tl-badge variant=${args.variant} size=${args.size} ?dot=${args.dot}>
      Badge
    </tl-badge>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <tl-badge variant="default">Default</tl-badge>
      <tl-badge variant="primary">Primary</tl-badge>
      <tl-badge variant="secondary">Secondary</tl-badge>
      <tl-badge variant="success">Success</tl-badge>
      <tl-badge variant="warning">Warning</tl-badge>
      <tl-badge variant="error">Error</tl-badge>
      <tl-badge variant="outline">Outline</tl-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <tl-badge size="sm" variant="primary">Small</tl-badge>
      <tl-badge size="md" variant="primary">Medium</tl-badge>
      <tl-badge size="lg" variant="primary">Large</tl-badge>
    </div>
  `,
};

export const WithDot: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <tl-badge dot variant="success">Online</tl-badge>
      <tl-badge dot variant="warning">Away</tl-badge>
      <tl-badge dot variant="error">Offline</tl-badge>
      <tl-badge dot variant="default">Idle</tl-badge>
    </div>
  `,
};

export const UseCases: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; font-family: var(--tl-typography-fontFamily-sans);">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>Messages</span>
        <tl-badge variant="primary" size="sm">5</tl-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>Status:</span>
        <tl-badge dot variant="success">Active</tl-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>Version</span>
        <tl-badge variant="outline">v2.0.0</tl-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>Priority:</span>
        <tl-badge variant="error">High</tl-badge>
        <tl-badge variant="warning">Medium</tl-badge>
        <tl-badge variant="success">Low</tl-badge>
      </div>
    </div>
  `,
};
