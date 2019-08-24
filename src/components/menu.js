import {capitalize, createElement} from '../utils.js';

export class Menu {
  constructor(menuData, activeItem) {
    this._menuData = menuData;
    this._activeItem = activeItem || menuData[0];
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  get template() {
    return `<div>
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${this._menuData.map((it) => `<a class="trip-tabs__btn
        ${it === this._activeItem ? `trip-tabs__btn--active` : ``}" href="#${it}">${capitalize(it)}</a>
      `).join(``)}
    </nav></div>
  `.trim();
  }
}
