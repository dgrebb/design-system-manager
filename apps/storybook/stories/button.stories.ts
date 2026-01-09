import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
      description: 'Visual variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state with spinner',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Button text content',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    label: 'Button',
  },
  render: (args) => html`
    <tl-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </tl-button>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * The default primary button style.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

/**
 * Secondary button for less prominent actions.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

/**
 * Ghost button with transparent background.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
};

/**
 * Outline button with border and transparent background.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button',
  },
};

/**
 * All button sizes.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <tl-button size="sm">Small</tl-button>
      <tl-button size="md">Medium</tl-button>
      <tl-button size="lg">Large</tl-button>
    </div>
  `,
};

/**
 * All button variants.
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <tl-button variant="primary">Primary</tl-button>
      <tl-button variant="secondary">Secondary</tl-button>
      <tl-button variant="ghost">Ghost</tl-button>
      <tl-button variant="outline">Outline</tl-button>
    </div>
  `,
};

/**
 * Disabled state for all variants.
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <tl-button variant="primary" disabled>Primary</tl-button>
      <tl-button variant="secondary" disabled>Secondary</tl-button>
      <tl-button variant="ghost" disabled>Ghost</tl-button>
      <tl-button variant="outline" disabled>Outline</tl-button>
    </div>
  `,
};

/**
 * Loading state with spinner.
 */
export const Loading: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <tl-button variant="primary" loading>Loading</tl-button>
      <tl-button variant="secondary" loading>Loading</tl-button>
    </div>
  `,
};
