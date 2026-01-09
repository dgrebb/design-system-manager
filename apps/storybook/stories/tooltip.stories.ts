import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@theme-lab/components';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'Tooltip content',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
    },
    delay: {
      control: { type: 'number' },
      description: 'Delay before showing (ms)',
    },
  },
  args: {
    content: 'This is a tooltip',
    position: 'top',
    delay: 200,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <tl-tooltip content=${args.content} position=${args.position} delay=${args.delay}>
        <tl-button>Hover me</tl-button>
      </tl-tooltip>
    </div>
  `,
};

export const Positions: Story = {
  render: () => html`
    <div style="padding: 4rem; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
      <tl-tooltip content="Top tooltip" position="top">
        <tl-button variant="outline">Top</tl-button>
      </tl-tooltip>
      <tl-tooltip content="Bottom tooltip" position="bottom">
        <tl-button variant="outline">Bottom</tl-button>
      </tl-tooltip>
      <tl-tooltip content="Left tooltip" position="left">
        <tl-button variant="outline">Left</tl-button>
      </tl-tooltip>
      <tl-tooltip content="Right tooltip" position="right">
        <tl-button variant="outline">Right</tl-button>
      </tl-tooltip>
    </div>
  `,
};

export const WithDifferentTriggers: Story = {
  render: () => html`
    <div style="padding: 4rem; display: flex; gap: 2rem; align-items: center; justify-content: center;">
      <tl-tooltip content="Button tooltip">
        <tl-button variant="primary">Button</tl-button>
      </tl-tooltip>
      <tl-tooltip content="Icon tooltip">
        <span style="cursor: pointer; font-size: 1.5rem;">ℹ️</span>
      </tl-tooltip>
      <tl-tooltip content="Text tooltip">
        <span style="text-decoration: underline dotted; cursor: help; font-family: var(--tl-typography-fontFamily-sans);">
          Hover for info
        </span>
      </tl-tooltip>
    </div>
  `,
};
