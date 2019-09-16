import {capitalize} from '../utils.js';
import {BaseComponent} from '../base-component.js';

export class Menu extends BaseComponent {
  constructor(params) {
    super(params);
    this.on(this.element, `click`, (evt) => {
      console.log(evt.target.tagName);
    });
  }
  get template() {
    const {menuData, activeItem} = this._data;
    return `
    <div>
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuData.map((it) => `<a class="trip-tabs__btn
          ${it === activeItem ? `trip-tabs__btn--active` : ``}" href="#${it}">${capitalize(it)}</a>
        `).join(``)}
      </nav>
    </div>`.trim();
  }
}
