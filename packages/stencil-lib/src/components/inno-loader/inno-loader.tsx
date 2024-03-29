import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'inno-loader',
  styleUrl: 'inno-loader.scss',
  scoped: true,
})
export class InnoLoader {

  @Prop({mutable : true}) size: number = 64;

  componentWillLoad()
  {
    if(this.size > 64)
    {
      this.size = 64;
    }
  }
  render() {
    return (
      <Host class={`icon-${this.size}`}>
       
      </Host>
    );
  }

}
