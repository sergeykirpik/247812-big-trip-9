import {createElement, render} from "../utils";
import {Menu} from "./menu";
import {Filter} from "./filter";

import {menuData, filterMethods} from "../data.js";

export class TripControls {
  constructor() {
    this._element = null;
    this._menu = new Menu(menuData);
    this._filter = new Filter(filterMethods);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      render(this._element, this._menu);
      render(this._element, this._filter);
    }
    return this._element;
  }

  get template() {
    return `
    <div class="trip-main__trip-controls  trip-controls">
      <!-- Меню -->
      <!-- Фильтры -->
    </div>`.trim();
  }
}
