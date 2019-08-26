import {createElement} from '../utils.js';

export class NoPoints {
  constructor() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  get template() {
    return `
      <p class="trip-events__msg">Click New Event to create your first point</p>    
    `;
  }
}
