import {createElement, render} from "./utils";

export class BaseComponent {
  constructor(params) {
    params = params || {};
    this._element = null;
    this._children = (params.children || []).filter((it) => it !== null);
    this._data = params.data || {};
    this._callbacks = params.callbacks || {};
    this._ownedComponents = [];
  }

  on() {
    console.log(`FIX me!!!`);
  }

  _afterShow() {
    // overriden in accestors
  }

  addOwnedComponent(component) {
    this._ownedComponents.push(component);
    return component;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      this._children.forEach((component) => render(this._element, component));
    }
    return this._element;
  }

  setVisibility(isVisible) {
    if (isVisible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.element.classList.remove(`visually-hidden`);
    this._afterShow();
  }

  hide() {
    this.element.classList.add(`visually-hidden`);
  }

  get template() {
    return `<div></div>`;
  }

  removeElement() {
    this._element = null;
    this._children.forEach((component) => component.removeElement());
    this._ownedComponents.forEach((component) => component.removeElement());
  }

}
