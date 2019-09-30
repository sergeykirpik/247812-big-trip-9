import {capitalize} from '../utils.js';
import {BaseComponent} from '../base-component.js';
import {eventEmmiter} from '../event-emmiter.js';

export class Menu extends BaseComponent {
  constructor(params) {
    super(params);
    this.element.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        this._callbacks.onAction(evt.target.hash.slice(1));
      }
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
