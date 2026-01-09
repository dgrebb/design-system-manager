import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Theme Lab Switch Component
 *
 * @element tl-switch
 * @slot - Label content
 *
 * @fires change - When switch state changes
 */
@customElement('tl-switch')
export class TlSwitch extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tl-switch {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      font-size: var(--tl-typography-fontSize-base, 1rem);
      color: var(--tl-color-foreground-base, #1e293b);
      user-select: none;
    }

    .tl-switch--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tl-switch__track {
      position: relative;
      display: inline-flex;
      align-items: center;
      background-color: var(--tl-color-neutral-300, #cbd5e1);
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: background-color 150ms ease;
      padding: 0;
      flex-shrink: 0;
    }

    .tl-switch__track:focus-visible {
      outline: 2px solid var(--tl-color-primary-base, #3b82f6);
      outline-offset: 2px;
    }

    .tl-switch__track:disabled {
      cursor: not-allowed;
    }

    .tl-switch--checked .tl-switch__track {
      background-color: var(--tl-color-primary-base, #3b82f6);
    }

    .tl-switch__thumb {
      position: absolute;
      background-color: white;
      border-radius: 50%;
      transition: transform 150ms ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .tl-switch--checked .tl-switch__thumb {
      transform: translateX(100%);
    }

    /* Sizes */
    .tl-switch--sm .tl-switch__track {
      width: 28px;
      height: 16px;
    }

    .tl-switch--sm .tl-switch__thumb {
      width: 12px;
      height: 12px;
      left: 2px;
    }

    .tl-switch--md .tl-switch__track {
      width: 36px;
      height: 20px;
    }

    .tl-switch--md .tl-switch__thumb {
      width: 16px;
      height: 16px;
      left: 2px;
    }

    .tl-switch--lg .tl-switch__track {
      width: 44px;
      height: 24px;
    }

    .tl-switch--lg .tl-switch__thumb {
      width: 20px;
      height: 20px;
      left: 2px;
    }

    .tl-switch__label {
      line-height: 1.4;
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  name = '';

  private handleClick() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { checked: this.checked },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    const classes = [
      'tl-switch',
      `tl-switch--${this.size}`,
      this.checked ? 'tl-switch--checked' : '',
      this.disabled ? 'tl-switch--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <label class=${classes}>
        <button
          type="button"
          role="switch"
          class="tl-switch__track"
          aria-checked=${this.checked}
          ?disabled=${this.disabled}
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        >
          <span class="tl-switch__thumb"></span>
        </button>
        <span class="tl-switch__label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-switch': TlSwitch;
  }
}
