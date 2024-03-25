import { Element, Event, EventEmitter, Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'inno-select-item',
  styleUrl: 'inno-select-item.scss',
  scoped: true,
  formAssociated: true,
})
export class InnoSelectItem {
  @Prop() value: string;
  @Prop() label : string
  @Prop() icon: string;
  @Prop() selected: boolean = false;
  @Event() itemSelected: EventEmitter<string>;
  @Element() host: HTMLInnoSelectElement;

  selectItem() {
    this.itemSelected.emit(this.value);
  }

  render() {
    return (
      <Host class={{ 'select-item': true, 'icon-driven': this.icon != undefined, selected: this.selected }} onClick={() => this.selectItem()}>
        {this.icon? <inno-icon icon={this.icon} size={24}></inno-icon> : null}
        <div class="content-wrapper">{this.label}</div>
        {this.selected && !this.icon ? <inno-icon icon="check" size={16}></inno-icon> : null}
      </Host>
    );
  }
}
