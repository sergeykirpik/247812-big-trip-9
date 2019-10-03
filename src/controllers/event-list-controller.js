import EventList from "../components/event-list";
import BaseComponent from "../base-component";
import PointController from "./point-controller";
import EventSlot from "../components/event-slot";

export default class EventListController extends BaseComponent {
  constructor(params) {
    super(params);
    this._items = this._data.map((it) => new PointController({data: it}));
    this._element = new EventList({
      children: this._items.map((it) => new EventSlot({children: [it]}))
    }).element;
  }
}
