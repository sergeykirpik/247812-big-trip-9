import {capitalize, createElement} from '../utils.js';

export class Filter {
  constructor(filterMethods, currentFilter) {
    this._filterMethods = filterMethods;
    this._currentFilter = currentFilter || Object.keys(filterMethods)[0];
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

  _checked(filter) {
    return (filter === this._currentFilter) ? `checked` : ``;
  }

  get template() {
    return `
    <form class="trip-filters" action="#" method="get">
      ${Object.keys(this._filterMethods).map((k) => `<div class="trip-filters__filter">
        <input id="filter-${k}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${k}" ${this._checked(k)}>
        <label class="trip-filters__filter-label" for="filter-${k}">${capitalize(k)}</label>
      </div>`).join(``)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
  }
}
