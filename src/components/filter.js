import {capitalize} from '../utils.js';
import {filters} from '../data.js';

let currentFilter = `everything`;

export const getFilterMarkup = () => {
  return `
    <form class="trip-filters" action="#" method="get">
      ${Object.keys(filters).map((k) => `<div class="trip-filters__filter">
        <input id="filter-${k}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${k}" ${(k === currentFilter) ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${k}">${capitalize(k)}</label>
      </div>`).join(``)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};
