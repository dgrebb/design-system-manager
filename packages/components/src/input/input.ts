import { LitElement, html, css } from 'lit';
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
  static styles = css`
    :host {
      display: block;
    }

    .tl-input {
      display: block;
      width: 100%;
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      background-color: var(--tl-color-background-base, #ffffff);
      color: var(--tl-color-foreground-base, #1e293b);
      border: 1px solid var(--tl-color-border-base, #e2e8f0);
      transition: all 150ms ease;
    }

    .tl-input:focus {
      outline: none;
      border-color: var(--tl-color-primary-base, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .tl-input:disabled {
      background-color: var(--tl-color-neutral-100, #f1f5f9);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .tl-input::placeholder {
      color: var(--tl-color-foreground-muted, #94a3b8);
    }

    /* Sizes */
    .tl-input--sm {
      padding: 0.375rem 0.75rem;
      font-size: var(--tl-typography-fontSize-sm, 0.875rem);
      border-radius: var(--tl-borderRadius-sm, 0.25rem);
      min-height: 32px;
    }

    .tl-input--md {
      padding: 0.5rem 0.75rem;
      font-size: var(--tl-typography-fontSize-base, 1rem);
      border-radius: var(--tl-borderRadius-md, 0.375rem);
      min-height: 40px;
    }

    .tl-input--lg {
      padding: 0.625rem 1rem;
      font-size: var(--tl-typography-fontSize-lg, 1.125rem);
      border-radius: var(--tl-borderRadius-lg, 0.5rem);
      min-height: 48px;
    }

    /* Error state */
    .tl-input--error {
      border-color: var(--tl-color-error-base, #ef4444);
    }

    .tl-input--error:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
  `;

  @property({ type: String })
  type: InputType = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  name = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  error = false;

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
