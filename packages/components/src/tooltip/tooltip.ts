import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Theme Lab Tooltip Component
 *
 * @element tl-tooltip
 * @slot - Trigger element
 */
@customElement('tl-tooltip')
export class TlTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .tl-tooltip {
      display: inline-block;
      position: relative;
    }

    .tl-tooltip__content {
      position: absolute;
      z-index: 1000;
      padding: 0.5rem 0.75rem;
      background-color: var(--tl-color-neutral-900, #0f172a);
      color: var(--tl-color-neutral-50, #f8fafc);
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
      font-size: var(--tl-typography-fontSize-sm, 0.875rem);
      border-radius: var(--tl-borderRadius-md, 0.375rem);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms ease;
    }

    .tl-tooltip--visible .tl-tooltip__content {
      opacity: 1;
    }

    /* Positions */
    .tl-tooltip--top .tl-tooltip__content {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0.5rem;
    }

    .tl-tooltip--bottom .tl-tooltip__content {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.5rem;
    }

    .tl-tooltip--left .tl-tooltip__content {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
    }

    .tl-tooltip--right .tl-tooltip__content {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 0.5rem;
    }
  `;

  @property({ type: String })
  content = '';

  @property({ type: String, reflect: true })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: Number })
  delay = 200;

  @state()
  private visible = false;

  private showTimeout?: ReturnType<typeof setTimeout>;
  private hideTimeout?: ReturnType<typeof setTimeout>;

  private show() {
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  private hide() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.visible = false;
    }, 100);
  }

  render() {
    const classes = [
      'tl-tooltip',
      `tl-tooltip--${this.position}`,
      this.visible ? 'tl-tooltip--visible' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class=${classes}
        @mouseenter=${this.show}
        @mouseleave=${this.hide}
        @focusin=${this.show}
        @focusout=${this.hide}
      >
        <slot></slot>
        <div class="tl-tooltip__content" role="tooltip" aria-hidden=${!this.visible}>
          ${this.content}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-tooltip': TlTooltip;
  }
}
