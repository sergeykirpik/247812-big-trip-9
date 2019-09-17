import {EventList} from "../components/event-list";
import {BaseComponent} from "../base-component";
import {PointController} from "./point-controller";
import {EventSlot} from "../components/event-slot";

export class EventListController extends BaseComponent {
  constructor(params) {
    super(params);
    this._items = this._data.map((it) => new PointController({
      data: it, callbacks: {...this._callbacks, onEdit: (item) => this._onEdit(item)}
    }));
    this._element = new EventList({
      children: this._items.map((it) => new EventSlot({children: [it]}))
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
