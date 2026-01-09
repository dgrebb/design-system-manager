import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Theme Lab Card Component
 *
 * @element tl-card
 * @slot - Card content
 * @slot header - Card header content
 * @slot footer - Card footer content
 */
@customElement('tl-card')
export class TlCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tl-card {
      background-color: var(--tl-color-background-base, #ffffff);
      border-radius: var(--tl-borderRadius-lg, 0.5rem);
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      color: var(--tl-color-foreground-base, #1e293b);
      overflow: hidden;
    }

    .tl-card--default {
      border: 1px solid var(--tl-color-border-base, #e2e8f0);
    }

    .tl-card--outlined {
      border: 2px solid var(--tl-color-border-base, #e2e8f0);
      background-color: transparent;
    }

    .tl-card--elevated {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    }

    .tl-card--interactive {
      cursor: pointer;
      transition: all 150ms ease;
    }

    .tl-card--interactive:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    /* Padding */
    .tl-card--padding-none .tl-card__body {
      padding: 0;
    }

    .tl-card--padding-sm .tl-card__body {
      padding: 0.75rem;
    }

    .tl-card--padding-md .tl-card__body {
      padding: 1rem;
    }

    .tl-card--padding-lg .tl-card__body {
      padding: 1.5rem;
    }

    .tl-card__header {
      padding: 1rem 1rem 0;
    }

    .tl-card__header:empty {
      display: none;
    }

    .tl-card__body {
      /* Padding set by variant */
    }

    .tl-card__footer {
      padding: 0 1rem 1rem;
    }

    .tl-card__footer:empty {
      display: none;
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'default' | 'outlined' | 'elevated' = 'default';

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: String, reflect: true })
  padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  render() {
    const classes = [
      'tl-card',
      `tl-card--${this.variant}`,
      `tl-card--padding-${this.padding}`,
      this.interactive ? 'tl-card--interactive' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class=${classes}>
        <div class="tl-card__header">
          <slot name="header"></slot>
        </div>
        <div class="tl-card__body">
          <slot></slot>
        </div>
        <div class="tl-card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-card': TlCard;
  }
}
