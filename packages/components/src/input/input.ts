import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

/**
 * Theme Lab Input Component
 *
 * @element tl-input
 *
 * @csspart input - The input element
 *
 * @fires input - When value changes
 * @fires change - When value changes and input loses focus
 */
@customElement('tl-input')
export class TlInput extends LitElement {
  /**
   * Use light DOM for Tailwind/external CSS compatibility
   */
  protected createRenderRoot() {
    return this;
  }

  /**
   * Input type
   */
  @property({ type: String })
  type: InputType = 'text';

  /**
   * Input value
   */
  @property({ type: String })
  value = '';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Input name
   */
  @property({ type: String })
  name = '';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Required state
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Input size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const classes = [
      'tl-input',
      `tl-input--${this.size}`,
      this.error ? 'tl-input--error' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <input
        class=${classes}
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder}
        name=${this.name}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @input=${this.handleInput}
        @change=${this.handleChange}
        part="input"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-input': TlInput;
  }
}
