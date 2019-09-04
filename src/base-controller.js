import {BaseComponent} from "./base-component";
import {render, die} from "./utils";

export class BaseController extends BaseComponent {
  constructor(container) {
    super({});
    this._container = container || die(`container expected`);
    this._children = [];
  }

  get element() {
    if (this._element) {
      this._element = this._container;
      this._children.forEach((component) => render(this._element, component));
    }
    return this._element;
  }
}
