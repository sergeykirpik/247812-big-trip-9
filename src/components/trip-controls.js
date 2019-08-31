import {render} from "../utils";
import {Menu} from "./menu";
import {Filter} from "./filter";

import {menuData, filterMethods} from "../data.js";
import {AbstractComponent} from "./abstract-component";

export class TripControls extends AbstractComponent {
  constructor() {
    super();
    this._menu = this.createOwnedComponent(new Menu(menuData));
    this._filter = this.createOwnedComponent(new Filter(filterMethods));
  }

  _afterElementCreated() {
    render(this._element, this._menu);
    render(this._element, this._filter);
  }

  _beforeElementRemoved() {
    this._menu.removeElement();
    this._filter.removeElement();
  }

  get template() {
    return `
    <div class="trip-main__trip-controls  trip-controls">
      <!-- Меню -->
      <!-- Фильтры -->
    </div>`.trim();
  }
}
