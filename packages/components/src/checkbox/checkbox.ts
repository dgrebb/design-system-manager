import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Theme Lab Checkbox Component
 *
 * @element tl-checkbox
 * @slot - Label content
 *
 * @fires change - When checkbox state changes
 */
@customElement('tl-checkbox')
export class TlCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tl-checkbox {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      font-size: var(--tl-typography-fontSize-base, 1rem);
      color: var(--tl-color-foreground-base, #1e293b);
      user-select: none;
    }

    .tl-checkbox--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tl-checkbox__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .tl-checkbox__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.125rem;
      height: 1.125rem;
      border: 2px solid var(--tl-color-border-base, #cbd5e1);
      border-radius: var(--tl-borderRadius-sm, 0.25rem);
      background-color: var(--tl-color-background-base, #ffffff);
      transition: all 150ms ease;
      flex-shrink: 0;
    }

    .tl-checkbox:hover:not(.tl-checkbox--disabled) .tl-checkbox__box {
      border-color: var(--tl-color-primary-base, #3b82f6);
    }

    .tl-checkbox__input:focus-visible + .tl-checkbox__box {
      outline: 2px solid var(--tl-color-primary-base, #3b82f6);
      outline-offset: 2px;
    }

    .tl-checkbox--checked .tl-checkbox__box,
    .tl-checkbox--indeterminate .tl-checkbox__box {
      background-color: var(--tl-color-primary-base, #3b82f6);
      border-color: var(--tl-color-primary-base, #3b82f6);
    }

    .tl-checkbox__icon {
      width: 12px;
      height: 12px;
      color: white;
    }

    .tl-checkbox__label {
      line-height: 1.4;
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = '';

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!this.disabled) {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { checked: this.checked, value: this.value },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }

  render() {
    const classes = [
      'tl-checkbox',
      this.checked ? 'tl-checkbox--checked' : '',
      this.indeterminate ? 'tl-checkbox--indeterminate' : '',
      this.disabled ? 'tl-checkbox--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <label class=${classes}>
        <input
          type="checkbox"
          class="tl-checkbox__input"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name}
          value=${this.value}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
        />
        <span class="tl-checkbox__box">
          ${this.checked
            ? html`<svg class="tl-checkbox__icon" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`
            : this.indeterminate
              ? html`<svg class="tl-checkbox__icon" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`
              : null}
        </span>
        <span class="tl-checkbox__label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-checkbox': TlCheckbox;
  }
}
