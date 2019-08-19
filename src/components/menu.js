import {capitalize} from '../utils.js';
import {menuData} from '../data.js'

let activeMenuItem = `table`;

export const getMenuMarkup = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuData.map((it) => `<a class="trip-tabs__btn
        ${it === activeMenuItem ? `trip-tabs__btn--active` : ``}" href="#${it}">${capitalize(it)}</a>
      `).join(``)}
    </nav>
  `;
};
