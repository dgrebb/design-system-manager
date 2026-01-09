import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Theme Lab Button Component
 *
 * @element tl-button
 * @slot - Button content
 *
 * @csspart button - The button element
 */
@customElement('tl-button')
export class TlButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tl-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--tl-spacing-2, 0.5rem);
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      font-weight: var(--tl-typography-fontWeight-medium, 500);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 150ms ease;
      text-decoration: none;
      white-space: nowrap;
      user-select: none;
      line-height: 1.25;
    }

    .tl-button:focus-visible {
      outline: 2px solid var(--tl-color-primary-base, #3b82f6);
      outline-offset: 2px;
    }

    .tl-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Sizes */
    .tl-button--sm {
      padding: 0.375rem 0.75rem;
      font-size: var(--tl-typography-fontSize-sm, 0.875rem);
      border-radius: var(--tl-borderRadius-sm, 0.25rem);
      min-height: 32px;
    }

    .tl-button--md {
      padding: 0.5rem 1rem;
      font-size: var(--tl-typography-fontSize-base, 1rem);
      border-radius: var(--tl-borderRadius-md, 0.375rem);
      min-height: 40px;
    }

    .tl-button--lg {
      padding: 0.625rem 1.5rem;
      font-size: var(--tl-typography-fontSize-lg, 1.125rem);
      border-radius: var(--tl-borderRadius-lg, 0.5rem);
      min-height: 48px;
    }

    /* Variants */
    .tl-button--primary {
      background-color: var(--tl-color-primary-base, #3b82f6);
      color: var(--tl-color-primary-foreground, #ffffff);
    }

    .tl-button--primary:hover:not(:disabled) {
      background-color: var(--tl-color-primary-hover, #2563eb);
    }

    .tl-button--primary:active:not(:disabled) {
      background-color: var(--tl-color-primary-active, #1d4ed8);
    }

    .tl-button--secondary {
      background-color: var(--tl-color-secondary-base, #64748b);
      color: var(--tl-color-secondary-foreground, #ffffff);
    }

    .tl-button--secondary:hover:not(:disabled) {
      background-color: var(--tl-color-secondary-hover, #475569);
    }

    .tl-button--secondary:active:not(:disabled) {
      background-color: var(--tl-color-secondary-active, #334155);
    }

    .tl-button--ghost {
      background-color: transparent;
      color: var(--tl-color-foreground-base, #1e293b);
    }

    .tl-button--ghost:hover:not(:disabled) {
      background-color: var(--tl-color-neutral-100, #f1f5f9);
    }

    .tl-button--ghost:active:not(:disabled) {
      background-color: var(--tl-color-neutral-200, #e2e8f0);
    }

    .tl-button--outline {
      background-color: transparent;
      color: var(--tl-color-primary-base, #3b82f6);
      border-color: var(--tl-color-primary-base, #3b82f6);
    }

    .tl-button--outline:hover:not(:disabled) {
      background-color: var(--tl-color-primary-base, #3b82f6);
      color: var(--tl-color-primary-foreground, #ffffff);
    }

    /* Loading */
    .tl-button--loading {
      position: relative;
      color: transparent !important;
    }

    .tl-button__spinner {
      position: absolute;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: tl-spin 0.75s linear infinite;
    }

    .tl-button--loading .tl-button__spinner {
      color: var(--tl-color-primary-foreground, #ffffff);
    }

    @keyframes tl-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    const classes = [
      'tl-button',
      `tl-button--${this.variant}`,
      `tl-button--${this.size}`,
      this.loading ? 'tl-button--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        part="button"
      >
        ${this.loading
          ? html`<span class="tl-button__spinner" aria-hidden="true"></span>`
          : null}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-button': TlButton;
  }
}
