import {sortMethods} from "../data";
import {AbstractComponent} from "./abstract-component";
import {TripSort} from "./trip-sort";
import {DayList} from "./day-list";
import {NoPoints} from "./no-points";
import {render, unrender} from "../utils";

export class TripEventsSection extends AbstractComponent {
  constructor(points) {
    super();
    this._routePoints = points;
    this._sort = this.createOwnedComponent(new TripSort(sortMethods));
    this._dayList = this.createOwnedComponent(new DayList(points));
    this._noPoints = this.createOwnedComponent(new NoPoints());
  }

  update(points) {
    unrender(this._dayList);
    this._dayList = this.createOwnedComponent(new DayList(points));
    render(this.element, this._dayList);
  }

  get sort() {
    return this._sort;
  }

  get dayList() {
    return this._dayList;
  }

  _afterElementCreated() {
    if (this._routePoints.length > 0) {
      render(this.element, this._sort);
      render(this.element, this._dayList);
    } else {
      render(this.element, this._noPoints);
    }
  }

  get template() {
    return `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <!-- NoPoints -->
      <!-- or -->
      <!-- TripSort -->
      <!-- DayList -->
    </section>`.trim();
  }
}
