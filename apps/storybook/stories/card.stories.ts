import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
      description: 'Card variant',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Interactive hover state',
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
    interactive: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <tl-card variant=${args.variant} padding=${args.padding} ?interactive=${args.interactive}>
      <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">
        This is a basic card with some content inside.
      </p>
    </tl-card>
  `,
};

export const WithHeader: Story = {
  render: () => html`
    <tl-card style="max-width: 400px;">
      <div slot="header" style="font-family: var(--tl-typography-fontFamily-sans); font-weight: 600;">
        Card Title
      </div>
      <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">
        This card has a header section with a title.
      </p>
    </tl-card>
  `,
};

export const WithHeaderAndFooter: Story = {
  render: () => html`
    <tl-card style="max-width: 400px;">
      <div slot="header" style="font-family: var(--tl-typography-fontFamily-sans); font-weight: 600;">
        Subscription Plan
      </div>
      <div style="font-family: var(--tl-typography-fontFamily-sans);">
        <p style="margin: 0 0 0.5rem;">Pro Plan - $29/month</p>
        <p style="margin: 0; color: var(--tl-color-foreground-muted); font-size: 0.875rem;">
          Includes unlimited projects and priority support.
        </p>
      </div>
      <div slot="footer" style="display: flex; gap: 0.5rem;">
        <tl-button variant="primary" size="sm">Upgrade</tl-button>
        <tl-button variant="ghost" size="sm">Learn more</tl-button>
      </div>
    </tl-card>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <tl-card variant="default" style="width: 200px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Default card</p>
      </tl-card>
      <tl-card variant="outlined" style="width: 200px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Outlined card</p>
      </tl-card>
      <tl-card variant="elevated" style="width: 200px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Elevated card</p>
      </tl-card>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <tl-card interactive variant="default" style="width: 200px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Click me</p>
      </tl-card>
      <tl-card interactive variant="elevated" style="width: 200px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Hover effect</p>
      </tl-card>
    </div>
  `,
};

export const PaddingSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: start;">
      <tl-card padding="sm" style="width: 150px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans); font-size: 0.875rem;">Small padding</p>
      </tl-card>
      <tl-card padding="md" style="width: 150px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Medium padding</p>
      </tl-card>
      <tl-card padding="lg" style="width: 150px;">
        <p style="margin: 0; font-family: var(--tl-typography-fontFamily-sans);">Large padding</p>
      </tl-card>
    </div>
  `,
};
