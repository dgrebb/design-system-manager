import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    label: 'Enable notifications',
  },
  render: (args) => html`
    <tl-switch
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      size=${args.size}
    >
      ${args.label}
    </tl-switch>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <tl-switch size="sm" checked>Small switch</tl-switch>
      <tl-switch size="md" checked>Medium switch</tl-switch>
      <tl-switch size="lg" checked>Large switch</tl-switch>
    </div>
  `,
};

export const SettingsExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--tl-typography-fontFamily-sans); color: var(--tl-color-foreground-base);">Dark mode</span>
        <tl-switch checked></tl-switch>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--tl-typography-fontFamily-sans); color: var(--tl-color-foreground-base);">Notifications</span>
        <tl-switch></tl-switch>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--tl-typography-fontFamily-sans); color: var(--tl-color-foreground-base);">Auto-save</span>
        <tl-switch checked></tl-switch>
      </div>
    </div>
  `,
};
