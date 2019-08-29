import {TripEventsSection} from "../components/trip-events-sec";
import {render, unrender} from "../utils";
import {sortMethods} from "../data";

export class TripController {
  constructor({container, points}) {
    this._container = container;
    this._points = points;
    this._trip = new TripEventsSection(points);
  }

  init() {
    render(this._container, this._trip);
    this._trip.sort.onSort((method) => {
      const sorted = sortMethods[method](this._points);
      unrender(this._trip);
      this._trip = new TripEventsSection(sorted);
      this.init();
    });
  }
}
