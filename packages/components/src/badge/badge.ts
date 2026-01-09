import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Theme Lab Badge Component
 *
 * @element tl-badge
 * @slot - Badge content
 */
@customElement('tl-badge')
export class TlBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tl-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      font-weight: var(--tl-typography-fontWeight-medium, 500);
      border-radius: 9999px;
      white-space: nowrap;
    }

    /* Sizes */
    .tl-badge--sm {
      padding: 0.125rem 0.5rem;
      font-size: var(--tl-typography-fontSize-xs, 0.75rem);
    }

    .tl-badge--md {
      padding: 0.25rem 0.625rem;
      font-size: var(--tl-typography-fontSize-sm, 0.875rem);
    }

    .tl-badge--lg {
      padding: 0.375rem 0.75rem;
      font-size: var(--tl-typography-fontSize-base, 1rem);
    }

    /* Variants */
    .tl-badge--default {
      background-color: var(--tl-color-neutral-100, #f1f5f9);
      color: var(--tl-color-neutral-700, #334155);
    }

    .tl-badge--primary {
      background-color: var(--tl-color-primary-base, #3b82f6);
      color: var(--tl-color-primary-foreground, #ffffff);
    }

    .tl-badge--secondary {
      background-color: var(--tl-color-secondary-base, #64748b);
      color: var(--tl-color-secondary-foreground, #ffffff);
    }

    .tl-badge--success {
      background-color: var(--tl-color-success-base, #22c55e);
      color: var(--tl-color-success-foreground, #ffffff);
    }

    .tl-badge--warning {
      background-color: var(--tl-color-warning-base, #f59e0b);
      color: var(--tl-color-warning-foreground, #ffffff);
    }

    .tl-badge--error {
      background-color: var(--tl-color-error-base, #ef4444);
      color: var(--tl-color-error-foreground, #ffffff);
    }

    .tl-badge--outline {
      background-color: transparent;
      border: 1px solid var(--tl-color-border-base, #e2e8f0);
      color: var(--tl-color-foreground-base, #1e293b);
    }

    /* Dot indicator */
    .tl-badge__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }

    .tl-badge--dot {
      padding-left: 0.5rem;
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' = 'default';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  dot = false;

  render() {
    const classes = [
      'tl-badge',
      `tl-badge--${this.variant}`,
      `tl-badge--${this.size}`,
      this.dot ? 'tl-badge--dot' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <span class=${classes}>
        ${this.dot ? html`<span class="tl-badge__dot"></span>` : null}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-badge': TlBadge;
  }
}
