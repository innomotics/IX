import { Event, EventEmitter, Element, Component, Host, Prop, h, State, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'inno-select',
  styleUrl: 'inno-select.scss',
  scoped: true,
})
export class InnoSelect {
  @Element() hostElement!: HTMLInnoSelectElement;

  private itemsContainerRef?: HTMLDivElement;
  @State() navigationItem: HTMLInnoSelectItemElement;

  @Prop() name: string;
  @Prop() type: 'text' | 'number' = 'text';
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) isFocused: boolean;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() label: string;
  @Prop() variant: 'light' | 'dark' = 'light';
  @State() isOpen: boolean = false;
  @Prop() iconDriven: boolean = false;
  @Event() valueChanged: EventEmitter<string>;

  selectClicked() {
    this.isOpen = !this.isOpen;
  }

  componentDidLoad() {
    if (this.value) {
      this.selectitem(this.value, true);
    }
  }

  onFocusout() {
    this.isFocused = false;
    this.isOpen = false;
  }

  @Watch('isOpen')
  alignItems() {
    let selectPacement = this.hostElement.getBoundingClientRect();
    this.itemsContainerRef.setAttribute('style', `top: ${selectPacement.bottom}px; left: ${selectPacement.left}px; width: ${selectPacement.width}px;`);
  }

  @Listen('resize', { target: 'document' })
  windowResize() {
    this.isOpen = false;
  }

  @Listen('scroll', { target: 'window' })
  windowResizea() {
    this.isOpen = false;
  }

  @Listen('itemSelected')
  itemSelected(event: CustomEvent<string>) {
    this.selectitem(event.detail);
  }

  selectitem(value: string, init: boolean = false) {
    this.value = value;
    if (!init) {
      this.valueChanged.emit(this.value);
    }
    this.items.forEach(i => {
      if (i.value === this.value) {
        i.selected = true;
      } else {
        i.selected = false;
      }
    });
  }

  clearFocus() {
    let focusdItems = this.items.filter(si => si.classList.contains('focused'));
    focusdItems.forEach(fi => fi.classList.remove('focused'));
  }

  @Listen('keydown')
  keyboardHandler(ev: KeyboardEvent) {
    if (ev.key === 'Enter' || ev.key == 'NumpadEnter') {
      this.isOpen = !this.isOpen;
      if (!this.isOpen) {
        this.clearFocus();
        if (this.navigationItem) {
          this.selectitem(this.navigationItem.value);
        }
        this.navigationItem = undefined;
      }
    }
    if ((ev.key == 'ArrowDown' || ev.key == 'ArrowUp') && this.isOpen) {
      ev.preventDefault();
      ev.stopPropagation();
      this.clearFocus();

      if (this.navigationItem) {
        let index = this.items.indexOf(this.navigationItem);
        switch (ev.key) {
          case 'ArrowUp': {
            if (index - 1 >= 0) {
              this.navigationItem = this.items[index - 1];
            }
            break;
          }
          case 'ArrowDown': {
            if (index + 1 < this.items.length) {
              this.navigationItem = this.items[index + 1];
            }
            break;
          }
        }
      } else {
        if (this.items.length > 0) {
          this.navigationItem = this.items[0];
        }
      }
      if (this.navigationItem) {
        this.navigationItem.classList.add('focused');
      }
    }
  }

  get items() {
    return [...Array.from(this.hostElement.querySelectorAll('inno-select-item'))];
  }

  get selectedItem() {
    return this.items.find(i => i.value == this.value);
  }

  render() {
    return (
      <Host
        tabindex={0}
        class={{
          'input-container': true,
          'isactive': this.value != undefined,
          'focused': this.isFocused,
          'light': this.variant === 'light',
          'dark': this.variant === 'dark',
          'disabled': this.disabled,
        }}
        onFocusout={() => this.onFocusout()}
        onClick={() => this.selectClicked()}
      >
        <div>
          {!this.iconDriven ? (
            <div class="select-header">
              <div class={{ content: true, filled: this.value != undefined }}>
                <span class={{ label: true, float: this.value != undefined, disabled: this.disabled, light: this.variant === 'light', dark: this.variant === 'dark' }}>
                  {this.label}
                </span>
                <span>{this.selectedItem.label}</span>
              </div>
              <inno-icon icon={this.isOpen ? 'chevron-up' : 'chevron-down'} size={16}></inno-icon>{' '}
            </div>
          ) : (
            <div class="select-item icon-driven">
              {this.selectedItem.icon ? <inno-icon icon={this.selectedItem.icon} size={32}></inno-icon> : null}
              <div class="content-wrapper">{this.selectedItem.label}</div>
              <inno-icon icon={this.isOpen ? 'chevron-up' : 'chevron-down'} size={16}></inno-icon>{' '}
            </div>
          )}
        </div>
        <div ref={el => (this.itemsContainerRef = el as HTMLDivElement)} class={{ items: true, opened: this.isOpen }}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
