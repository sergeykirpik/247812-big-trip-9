import {capitalize} from '../utils.js';
import {BaseComponent} from '../base-component.js';

export class Filter extends BaseComponent {

  _checked(filter) {
    return (filter === this._data.currentFilter) ? `checked` : ``;
  }

  get template() {
    const {filterMethods} = this._data;
    return `
    <div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${Object.keys(filterMethods).map((k) => `<div class="trip-filters__filter">
          <input id="filter-${k}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${k}" ${this._checked(k)}>
          <label class="trip-filters__filter-label" for="filter-${k}">${capitalize(k)}</label>
        </div>`).join(``)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`.trim();
  }
}
