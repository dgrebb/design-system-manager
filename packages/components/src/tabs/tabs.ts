import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

/**
 * Theme Lab Tabs Component
 *
 * @element tl-tabs
 * @slot - Tab panel content (use data-tab="tabId" attribute)
 *
 * @fires change - When active tab changes
 */
@customElement('tl-tabs')
export class TlTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tl-tabs {
      font-family: var(--tl-typography-fontFamily-sans, system-ui, sans-serif);
    }

    .tl-tabs__list {
      display: flex;
      gap: 0.25rem;
      border-bottom: 1px solid var(--tl-color-border-base, #e2e8f0);
    }

    .tl-tabs--pills .tl-tabs__list {
      border-bottom: none;
      background-color: var(--tl-color-neutral-100, #f1f5f9);
      border-radius: var(--tl-borderRadius-md, 0.375rem);
      padding: 0.25rem;
    }

    .tl-tabs--underline .tl-tabs__list {
      gap: 0;
    }

    .tl-tabs__trigger {
      padding: 0.5rem 1rem;
      background: none;
      border: none;
      font-family: inherit;
      font-size: var(--tl-typography-fontSize-sm, 0.875rem);
      font-weight: var(--tl-typography-fontWeight-medium, 500);
      color: var(--tl-color-foreground-muted, #64748b);
      cursor: pointer;
      transition: all 150ms ease;
      position: relative;
    }

    .tl-tabs__trigger:hover:not(:disabled) {
      color: var(--tl-color-foreground-base, #1e293b);
    }

    .tl-tabs__trigger:focus-visible {
      outline: 2px solid var(--tl-color-primary-base, #3b82f6);
      outline-offset: -2px;
    }

    .tl-tabs__trigger--active {
      color: var(--tl-color-primary-base, #3b82f6);
    }

    /* Default variant - bottom border */
    .tl-tabs--default .tl-tabs__trigger--active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--tl-color-primary-base, #3b82f6);
    }

    /* Pills variant */
    .tl-tabs--pills .tl-tabs__trigger--active {
      background-color: var(--tl-color-background-base, #ffffff);
      border-radius: var(--tl-borderRadius-sm, 0.25rem);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    /* Underline variant */
    .tl-tabs--underline .tl-tabs__trigger--active {
      border-bottom: 2px solid var(--tl-color-primary-base, #3b82f6);
      margin-bottom: -1px;
    }

    .tl-tabs__trigger--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tl-tabs__panels {
      padding-top: 1rem;
    }

    .tl-tabs__panel {
      display: none;
    }

    .tl-tabs__panel--active {
      display: block;
    }

    /* Sizes */
    .tl-tabs--sm .tl-tabs__trigger {
      padding: 0.375rem 0.75rem;
      font-size: var(--tl-typography-fontSize-xs, 0.75rem);
    }

    .tl-tabs--lg .tl-tabs__trigger {
      padding: 0.75rem 1.25rem;
      font-size: var(--tl-typography-fontSize-base, 1rem);
    }
  `;

  @property({ type: Array })
  tabs: Tab[] = [];

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'pills' | 'underline' = 'default';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @state()
  private activeTab = '';

  connectedCallback() {
    super.connectedCallback();
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.value || this.tabs[0].id;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') && this.value) {
      this.activeTab = this.value;
    }
    if (changedProperties.has('tabs') && this.tabs.length > 0 && !this.activeTab) {
      this.activeTab = this.tabs[0].id;
    }
  }

  private selectTab(tab: Tab) {
    if (tab.disabled) return;
    
    this.activeTab = tab.id;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: tab.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent, index: number) {
    const enabledTabs = this.tabs.filter(t => !t.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(t => t.id === this.tabs[index].id);

    let newIndex = currentEnabledIndex;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledTabs.length - 1;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = currentEnabledIndex < enabledTabs.length - 1 ? currentEnabledIndex + 1 : 0;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = enabledTabs.length - 1;
    }

    if (newIndex !== currentEnabledIndex) {
      this.selectTab(enabledTabs[newIndex]);
      // Focus the new tab button
      const buttons = this.shadowRoot?.querySelectorAll('.tl-tabs__trigger');
      const newButton = Array.from(buttons || []).find(
        b => b.getAttribute('data-tab') === enabledTabs[newIndex].id
      ) as HTMLButtonElement;
      newButton?.focus();
    }
  }

  render() {
    const classes = [
      'tl-tabs',
      `tl-tabs--${this.variant}`,
      `tl-tabs--${this.size}`,
    ].join(' ');

    return html`
      <div class=${classes}>
        <div class="tl-tabs__list" role="tablist">
          ${this.tabs.map((tab, index) => {
            const isActive = this.activeTab === tab.id;
            const triggerClasses = [
              'tl-tabs__trigger',
              isActive ? 'tl-tabs__trigger--active' : '',
              tab.disabled ? 'tl-tabs__trigger--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return html`
              <button
                type="button"
                role="tab"
                class=${triggerClasses}
                data-tab=${tab.id}
                aria-selected=${isActive}
                aria-controls="panel-${tab.id}"
                ?disabled=${tab.disabled}
                tabindex=${isActive ? 0 : -1}
                @click=${() => this.selectTab(tab)}
                @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, index)}
              >
                ${tab.label}
              </button>
            `;
          })}
        </div>
        <div class="tl-tabs__panels">
          ${this.tabs.map(tab => {
            const isActive = this.activeTab === tab.id;
            return html`
              <div
                id="panel-${tab.id}"
                role="tabpanel"
                class="tl-tabs__panel ${isActive ? 'tl-tabs__panel--active' : ''}"
                aria-labelledby=${tab.id}
                ?hidden=${!isActive}
              >
                <slot name=${tab.id}></slot>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-tabs': TlTabs;
  }
}
