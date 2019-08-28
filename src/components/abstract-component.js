import {createElement} from "../utils";
import {EventManager} from "../event-manager";

export class AbstractComponent extends EventManager {
  constructor() {
    super();
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  _afterElementCreated() {
  }

  _beforeElementRemoved() {
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      this._afterElementCreated();
    }
    return this._element;
  }

  removeElement() {
    this._beforeElementRemoved();
    this._element = null;
  }

  get template() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
