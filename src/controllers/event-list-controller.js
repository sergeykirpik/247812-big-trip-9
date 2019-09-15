import {EventList} from "../components/event-list";
import {BaseComponent} from "../base-component";
import {PointController} from "./point-controller";

export class EventListController extends BaseComponent {
  constructor(params) {
    super(params);
    this._items = this._data.map((it) => new PointController({
      data: it, callbacks: {...this._callbacks, onEdit: (item) => this._onEdit(item)}
    }));
    this._element = new EventList({
      children: this._items
    }).element;
  }

  _onEdit(item) {
    this._items.forEach((it) => {
      if (it !== item) {
        it.dismiss();
      }
    });
  }
}
