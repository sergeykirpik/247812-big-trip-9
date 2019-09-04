import {capitalize} from '../utils.js';
import {BaseComponent} from '../base-component.js';

export class Filter extends BaseComponent {
  constructor(filterMethods, currentFilter) {
    super({});
    this._filterMethods = filterMethods;
    this._currentFilter = currentFilter || Object.keys(filterMethods)[0];
  }

  _checked(filter) {
    return (filter === this._currentFilter) ? `checked` : ``;
  }

  get template() {
    return `
    <div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${Object.keys(this._filterMethods).map((k) => `<div class="trip-filters__filter">
          <input id="filter-${k}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${k}" ${this._checked(k)}>
          <label class="trip-filters__filter-label" for="filter-${k}">${capitalize(k)}</label>
        </div>`).join(``)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`.trim();
  }
}
