import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'underline'],
      description: 'Tab style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tab size',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj;

const sampleTabs = [
  { id: 'account', label: 'Account' },
  { id: 'password', label: 'Password' },
  { id: 'notifications', label: 'Notifications' },
];

export const Default: Story = {
  render: (args) => html`
    <tl-tabs
      .tabs=${sampleTabs}
      variant=${args.variant}
      size=${args.size}
    >
      <div slot="account" style="font-family: var(--tl-typography-fontFamily-sans);">
        <h3 style="margin-top: 0;">Account Settings</h3>
        <p>Manage your account details and preferences.</p>
      </div>
      <div slot="password" style="font-family: var(--tl-typography-fontFamily-sans);">
        <h3 style="margin-top: 0;">Password</h3>
        <p>Change your password and security settings.</p>
      </div>
      <div slot="notifications" style="font-family: var(--tl-typography-fontFamily-sans);">
        <h3 style="margin-top: 0;">Notifications</h3>
        <p>Configure how you receive notifications.</p>
      </div>
    </tl-tabs>
  `,
};

export const Pills: Story = {
  args: { variant: 'pills' },
  render: (args) => html`
    <tl-tabs
      .tabs=${sampleTabs}
      variant=${args.variant}
      size=${args.size}
    >
      <div slot="account" style="font-family: var(--tl-typography-fontFamily-sans);">
        Account content here
      </div>
      <div slot="password" style="font-family: var(--tl-typography-fontFamily-sans);">
        Password content here
      </div>
      <div slot="notifications" style="font-family: var(--tl-typography-fontFamily-sans);">
        Notifications content here
      </div>
    </tl-tabs>
  `,
};

export const Underline: Story = {
  args: { variant: 'underline' },
  render: (args) => html`
    <tl-tabs
      .tabs=${sampleTabs}
      variant=${args.variant}
      size=${args.size}
    >
      <div slot="account" style="font-family: var(--tl-typography-fontFamily-sans);">
        Account content here
      </div>
      <div slot="password" style="font-family: var(--tl-typography-fontFamily-sans);">
        Password content here
      </div>
      <div slot="notifications" style="font-family: var(--tl-typography-fontFamily-sans);">
        Notifications content here
      </div>
    </tl-tabs>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <p style="margin-bottom: 0.5rem; font-family: var(--tl-typography-fontFamily-sans); font-weight: 500;">Small</p>
        <tl-tabs .tabs=${sampleTabs} size="sm">
          <div slot="account">Small tabs content</div>
          <div slot="password">Password</div>
          <div slot="notifications">Notifications</div>
        </tl-tabs>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; font-family: var(--tl-typography-fontFamily-sans); font-weight: 500;">Medium</p>
        <tl-tabs .tabs=${sampleTabs} size="md">
          <div slot="account">Medium tabs content</div>
          <div slot="password">Password</div>
          <div slot="notifications">Notifications</div>
        </tl-tabs>
      </div>
      <div>
        <p style="margin-bottom: 0.5rem; font-family: var(--tl-typography-fontFamily-sans); font-weight: 500;">Large</p>
        <tl-tabs .tabs=${sampleTabs} size="lg">
          <div slot="account">Large tabs content</div>
          <div slot="password">Password</div>
          <div slot="notifications">Notifications</div>
        </tl-tabs>
      </div>
    </div>
  `,
};

export const WithDisabledTab: Story = {
  render: () => html`
    <tl-tabs
      .tabs=${[
        { id: 'active', label: 'Active Tab' },
        { id: 'disabled', label: 'Disabled Tab', disabled: true },
        { id: 'another', label: 'Another Tab' },
      ]}
    >
      <div slot="active" style="font-family: var(--tl-typography-fontFamily-sans);">
        This tab is active
      </div>
      <div slot="disabled" style="font-family: var(--tl-typography-fontFamily-sans);">
        This content won't be visible
      </div>
      <div slot="another" style="font-family: var(--tl-typography-fontFamily-sans);">
        Another tab content
      </div>
    </tl-tabs>
  `,
};
