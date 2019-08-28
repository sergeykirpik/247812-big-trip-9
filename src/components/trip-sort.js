import {createElement} from '../utils.js';

export class TripSort {
  constructor(sortMethods, currentSort) {
    this._sortMethods = sortMethods;
    this._currentSort = currentSort || Object.keys(sortMethods)[0];
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
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${Object.keys(this._sortMethods).map((k) => `<div class="trip-sort__item  trip-sort__item--${k}">
        <input id="sort-${k}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
               value="sort-${k}" ${k === this._currentSort ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${k}">
          ${k}
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>`).join(``)}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  `.trim();
  }
}
