import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'inno-accordion',
  styleUrl: 'inno-accordion.scss',
  scoped: true
})
export class InnoAccordion {
  @Prop({ mutable: true }) variant: 'light' | 'dark' = 'light';
  @Prop({ mutable: true }) icon: string;
  @Prop({ mutable: true }) collapsed = false;
  @Prop({ mutable: true }) last = false;
  @Prop({ mutable: true }) inner = false;
  @Prop() label: string;

  /**
   * This event is fired whenever the accordion is opened/closed.
   */
  @Event() collapsedChanged: EventEmitter<{ element: HTMLInnoAccordionElement, collapsed: boolean }>;

  @Element() hostElement!: HTMLInnoAccordionElement;

  private anchorElementRef: HTMLAnchorElement;

  private onHeaderClick() {
    this.collapsed = !this.collapsed;
    this.collapsedChanged.emit({ element: this.hostElement, collapsed: this.collapsed });
  }

  private toggleHoveredClass(hovered: boolean) {
    if (hovered) {
      this.anchorElementRef.classList.add("hovered");
    } else {
      this.anchorElementRef.classList.remove("hovered");
    }
  }

  render() {
    let iconSize: number = 24;
    let icon: string = this.collapsed ? this.inner ? 'chevron-down-small' : 'plus' : this.inner ? 'chevron-up-small' : 'minus';
    return (
      <Host>
        <a class={{
          'accordion': true,
          'light': this.variant === 'light',
          'dark': this.variant === 'dark',
          'last': this.last,
          'open': !this.collapsed,
          'inner': this.inner,
        }}
          ref={(ref) => (this.anchorElementRef = ref)}
        >

          <div class={{
            'accordion-header': true,
            'inner': this.inner,
            'light': this.variant === 'light',
            'dark': this.variant === 'dark',
          }}
            onClick={() => this.onHeaderClick()}
            onMouseEnter={() => this.toggleHoveredClass(true)}
            onMouseLeave={() => this.toggleHoveredClass(false)}
          >

            <span class={{
              'accordion-header-title': true,
              'light': this.variant === 'light',
              'dark': this.variant === 'dark',
              hide: this.inner,
            }}>{this.label}</span>

            <inno-icon class={{
              'inner': this.inner,
            }} icon={icon} size={iconSize} theme={this.variant}></inno-icon>

            <span class={{
              'accordion-header-title': true,
              'inner': this.inner,
              'light': this.variant === 'light',
              'dark': this.variant === 'dark',
              hide: !this.inner,
            }}>{this.label}</span>

          </div>

          <section class={{
            'accordion-content': true,
            'inner': this.inner,
            'light': this.variant === 'light',
            'dark': this.variant === 'dark',
            hide: this.collapsed,
          }}>
            <slot></slot>
          </section>

        </a>
      </Host>
    );
  }

}