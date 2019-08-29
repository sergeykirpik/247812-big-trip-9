import {TripEventsSection} from "../components/trip-events-sec";
import {render, unrender} from "../utils";
import {sortMethods} from "../data";
import {TripSort} from "../components/trip-sort";
import {DayList} from "../components/day-list";
import {NoPoints} from "../components/no-points";

export class TripController {
  constructor({container, points}) {
    this._container = container;
    this._points = points;
    this._tripEventsSection = new TripEventsSection();
    this._sort = new TripSort(sortMethods);
    this._dayList = new DayList(points);
    this._noPoints = new NoPoints();
  }

  _renderTripEventsSection() {
    if (this._points.length > 0) {
      render(this._tripEventsSection.element, this._sort);
      render(this._tripEventsSection.element, this._dayList);
    } else {
      render(this._tripEventsSection.element, this._noPoints);
    }
    render(this._container, this._tripEventsSection);
  }

  init() {
    this._renderTripEventsSection();
    this._sort.onSort((method) => {
      const sorted = sortMethods[method](this._points);
      unrender(this._dayList);
      this._dayList = new DayList(sorted);
      render(this._tripEventsSection.element, this._dayList);
    });
  }
}
