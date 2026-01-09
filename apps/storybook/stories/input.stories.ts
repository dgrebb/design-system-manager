import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    value: {
      control: { type: 'text' },
      description: 'Input value',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    type: 'text',
    size: 'md',
    placeholder: 'Enter text...',
    value: '',
    disabled: false,
    error: false,
    required: false,
  },
  render: (args) => html`
    <tl-input
      type=${args.type}
      size=${args.size}
      placeholder=${args.placeholder}
      value=${args.value}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?required=${args.required}
    ></tl-input>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * Default text input.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

/**
 * Input with value.
 */
export const WithValue: Story = {
  args: {
    value: 'Hello, world!',
  },
};

/**
 * Password input.
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

/**
 * Email input.
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'name@example.com',
  },
};

/**
 * All input sizes.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <tl-input size="sm" placeholder="Small input"></tl-input>
      <tl-input size="md" placeholder="Medium input"></tl-input>
      <tl-input size="lg" placeholder="Large input"></tl-input>
    </div>
  `,
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

/**
 * Error state.
 */
export const Error: Story = {
  args: {
    error: true,
    value: 'Invalid value',
  },
};

/**
 * Form example with label.
 */
export const WithLabel: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <label
        for="username"
        style="font-family: var(--tl-typography-fontFamily-sans); font-size: var(--tl-typography-fontSize-sm); font-weight: var(--tl-typography-fontWeight-medium); color: var(--tl-color-foreground-base);"
      >
        Username
      </label>
      <tl-input id="username" placeholder="Enter username"></tl-input>
    </div>
  `,
};

/**
 * Form example with error message.
 */
export const WithError: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <label
        for="email"
        style="font-family: var(--tl-typography-fontFamily-sans); font-size: var(--tl-typography-fontSize-sm); font-weight: var(--tl-typography-fontWeight-medium); color: var(--tl-color-foreground-base);"
      >
        Email
      </label>
      <tl-input id="email" type="email" error value="invalid-email"></tl-input>
      <span
        style="font-family: var(--tl-typography-fontFamily-sans); font-size: var(--tl-typography-fontSize-sm); color: var(--tl-color-error-base);"
      >
        Please enter a valid email address
      </span>
    </div>
  `,
};
