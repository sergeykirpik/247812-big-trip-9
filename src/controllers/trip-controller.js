import {TripEventsSection} from "../components/trip-events-sec";
import {render, unrender} from "../utils";
import {SortType} from "../data";
import {TripSort} from "../components/trip-sort";
import {DayList} from "../components/day-list";
import {NoPoints} from "../components/no-points";

export class TripController {
  constructor({container, points}) {
    this._container = container;
    this._points = points;
    this._tripEventsSection = new TripEventsSection();
    this._sort = new TripSort(SortType);
    this._noPoints = new NoPoints();
    this._dayList = [];
    this._currentSort = SortType.event;
  }

  get _sortedPoints() {
    return this._currentSort(this._points);
  }

  get _isFlat() {
    return this._currentSort !== SortType.event;
  }

  _renderTripEventsSection() {
    unrender(this._tripEventsSection);
    if (this._points.length > 0) {
      this._sort = new TripSort(SortType, this._currentSort, this._isFlat);
      this._dayList = new DayList(this._sortedPoints, this._isFlat);
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
      this._currentSort = SortType[method];
      this.init();
    });
  }
}
