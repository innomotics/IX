/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@innomotics/ix';


@ProxyCmp({
  inputs: ['collapsed', 'icon', 'inner', 'label', 'last', 'variant']
})
@Component({
  selector: 'inno-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapsed', 'icon', 'inner', 'label', 'last', 'variant'],
})
export class InnoAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InnoAccordion extends Components.InnoAccordion {}


@ProxyCmp({
})
@Component({
  selector: 'inno-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class InnoBreadcrumb {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemClick']);
  }
}


export declare interface InnoBreadcrumb extends Components.InnoBreadcrumb {
  /**
   * Crumb item clicked event
   */
  itemClick: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['icon', 'iconSize', 'label', 'orderId']
})
@Component({
  selector: 'inno-breadcrumb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'iconSize', 'label', 'orderId'],
})
export class InnoBreadcrumbItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InnoBreadcrumbItem extends Components.InnoBreadcrumbItem {}


@ProxyCmp({
  inputs: ['colorVariant', 'disabled', 'icon', 'iconOnly', 'iconPosition', 'listType', 'navDirection', 'tabIdx', 'type', 'variant']
})
@Component({
  selector: 'inno-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colorVariant', 'disabled', 'icon', 'iconOnly', 'iconPosition', 'listType', 'navDirection', 'tabIdx', 'type', 'variant'],
})
export class InnoButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InnoButton extends Components.InnoButton {}


@ProxyCmp({
  inputs: ['active', 'type']
})
@Component({
  selector: 'inno-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'type'],
})
export class InnoError {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InnoError extends Components.InnoError {}


@ProxyCmp({
  inputs: ['copyright', 'entries', 'variant']
})
@Component({
  selector: 'inno-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['copyright', 'entries', 'variant'],
})
export class InnoFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['contentSelected']);
  }
}


export declare interface InnoFooter extends Components.InnoFooter {
  /**
   * The selector value is emitted if the given content is clicked.
   */
  contentSelected: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['icon', 'size', 'theme']
})
@Component({
  selector: 'inno-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'size', 'theme'],
})
export class InnoIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InnoIcon extends Components.InnoIcon {}


@ProxyCmp({
  inputs: ['disabled', 'isFocused', 'label', 'name', 'value', 'variant']
})
@Component({
  selector: 'inno-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'isFocused', 'label', 'name', 'value', 'variant'],
})
export class InnoInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChanged']);
  }
}


export declare interface InnoInput extends Components.InnoInput {

  valueChanged: EventEmitter<CustomEvent<string | number>>;
}


@ProxyCmp({
  inputs: ['closeOnBackdropClick', 'expanded', 'hideCloseButton', 'paneSize', 'position', 'titleText']
})
@Component({
  selector: 'inno-pane',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closeOnBackdropClick', 'expanded', 'hideCloseButton', 'paneSize', 'position', 'titleText'],
})
export class InnoPane {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['expandedChanged']);
  }
}


import type { ExpandedChangedEvent as IInnoPaneExpandedChangedEvent } from '@innomotics/ix';

export declare interface InnoPane extends Components.InnoPane {

  expandedChanged: EventEmitter<CustomEvent<IInnoPaneExpandedChangedEvent>>;
}


@ProxyCmp({
  inputs: ['for', 'placement', 'titleContent', 'trigger', 'variant', 'visible'],
  methods: ['showTooltip', 'hideTooltip']
})
@Component({
  selector: 'inno-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['for', 'placement', 'titleContent', 'trigger', 'variant', 'visible'],
})
export class InnoPopover {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InnoPopover extends Components.InnoPopover {}


@ProxyCmp({
  inputs: ['disabled', 'iconDriven', 'isFocused', 'label', 'name', 'type', 'value', 'variant']
})
@Component({
  selector: 'inno-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'iconDriven', 'isFocused', 'label', 'name', 'type', 'value', 'variant'],
})
export class InnoSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChanged']);
  }
}


export declare interface InnoSelect extends Components.InnoSelect {

  valueChanged: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['icon', 'label', 'selected', 'value']
})
@Component({
  selector: 'inno-select-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'label', 'selected', 'value'],
})
export class InnoSelectItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemSelected']);
  }
}


export declare interface InnoSelectItem extends Components.InnoSelectItem {

  itemSelected: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'tabIdx', 'variant']
})
@Component({
  selector: 'inno-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'tabIdx', 'variant'],
})
export class InnoToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkedChange']);
  }
}


export declare interface InnoToggle extends Components.InnoToggle {
  /**
   * An event will be dispatched each time the slide-toggle changes its value.
   */
  checkedChange: EventEmitter<CustomEvent<boolean>>;
}


