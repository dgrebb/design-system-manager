import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Indeterminate state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Accept terms and conditions',
  },
  render: (args) => html`
    <tl-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
    >
      ${args.label}
    </tl-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled checkbox' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled checked' },
};

export const WithoutLabel: Story = {
  render: () => html`<tl-checkbox checked></tl-checkbox>`,
};

export const Group: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <tl-checkbox checked>Email notifications</tl-checkbox>
      <tl-checkbox>SMS notifications</tl-checkbox>
      <tl-checkbox checked>Push notifications</tl-checkbox>
      <tl-checkbox disabled>In-app notifications (coming soon)</tl-checkbox>
    </div>
  `,
};
