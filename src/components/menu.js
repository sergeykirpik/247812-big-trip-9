import {capitalize} from '../utils.js';
import {BaseComponent} from '../base-component.js';

export class Menu extends BaseComponent {
  constructor(menuData, activeItem) {
    super({});
    this._menuData = menuData;
    this._activeItem = activeItem || menuData[0];
  }

  get template() {
    return `
    <div>
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this._menuData.map((it) => `<a class="trip-tabs__btn
          ${it === this._activeItem ? `trip-tabs__btn--active` : ``}" href="#${it}">${capitalize(it)}</a>
        `).join(``)}
      </nav>
    </div>`.trim();
  }
}
