import {createElement, render} from "./utils";
import {EventManager} from "./event-manager";

export class BaseComponent extends EventManager {
  constructor({children}) {
    super();
    this._element = null;
    this._children = children || [];
    this._ownedComponents = [];
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

  get template() {
    return `<div></div>`;
  }

  attachEventHandlers() {
    super.attachEventHandlers();
    this._children.forEach((component) => component.attachEventHandlers());
  }

  detachEventHandlers() {
    super.detachEventHandlers();
    this._children.forEach((component) => component.detachEventHandlers());
    this._ownedComponents.forEach((component) => component.detachEventHandlers());
  }

  removeElement() {
    this._element = null;
    this._children.forEach((component) => component.removeElement());
    this._ownedComponents.forEach((component) => component.removeElement());
  }

}
