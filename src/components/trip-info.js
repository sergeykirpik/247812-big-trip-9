import {createElement} from '../utils.js';

export class TripInfo {
  constructor({title, dates}) {
    this._title = title;
    this._dates = dates;
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
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._title}</h1>
      <p class="trip-info__dates">${this._dates}</p>
    </div>
  `;
  }
}

