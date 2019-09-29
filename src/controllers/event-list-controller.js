import {EventList} from "../components/event-list";
import {BaseComponent} from "../base-component";
import {PointController} from "./point-controller";
import {EventSlot} from "../components/event-slot";

export class EventListController extends BaseComponent {
  constructor(params) {
    super(params);
    this._route = params.route;
    this._items = this._data.map((it) => new PointController({
      route: params.route,
      data: it,
      callbacks: {onEdit: (item) => this._onEdit(item)}
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
