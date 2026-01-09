import { LitElement, html } from 'lit';
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
 *
 * @cssprop --tl-color-primary-base - Primary button background
 * @cssprop --tl-color-primary-hover - Primary button hover background
 * @cssprop --tl-spacing-sm - Small padding
 * @cssprop --tl-spacing-md - Medium padding
 */
@customElement('tl-button')
export class TlButton extends LitElement {
  /**
   * Use light DOM for Tailwind/external CSS compatibility
   */
  protected createRenderRoot() {
    return this;
  }

  /**
   * Button variant
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /**
   * Button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Button type
   */
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
