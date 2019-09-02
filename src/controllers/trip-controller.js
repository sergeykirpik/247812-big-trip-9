import {TripEventsSection} from "../components/trip-events-sec";
import {render, unrender, formatDate, groupBy} from "../utils";
import {SortType} from "../data";
import {DayList} from "../components/day-list";
import {NoPoints} from "../components/no-points";
import {DayListHeader} from "../components/day-list-header";
import {DayItem} from "../components/day-item";
import {EventList} from "../components/event-list";

const columns = [
  {
    title: `day`,
    sortable: false,
  },
  {
    title: `event`,
    sortable: true,
  },
  {
    title: `time`,
    sortable: true,
  },
  {
    title: `price`,
    sortable: true,
  },
  {
    title: `offers`,
    sortable: false,
  }
];

export class TripController {
  constructor({container, points}) {
    this._container = container;
    this._points = points;
    this._tripEventsSection = new TripEventsSection();
    this._sort = null;
    this._noPoints = new NoPoints();
    this._currentSort = `event`;
  }

  get _pointsByDay() {
    return groupBy(this._points, (a, b) =>
      formatDate(a.startTime, `YYYY-MM-DD`) === formatDate(b.startTime, `YYYY-MM-DD`));
  }

  get _sortedPoints() {
    return SortType[this._currentSort](this._points);
  }

  get _visibleColumns() {
    return this._currentSort === `event` ? columns
      : columns.map((it) => it.title === `day` ? {...it, title: ``} : it);
  }

  get _groupedDayList() {
    const dayItems = this._pointsByDay.map((it) => new DayItem({
      eventList: new EventList(it),
      dayCounter: it[0].dayNo,
      dayDate: formatDate(it[0].startTime, `YYYY-MM-DD`),
    }));
    return new DayList(dayItems);
  }

  get _sortedDayList() {
    const dayItem = new DayItem({
      eventList: new EventList(this._sortedPoints)
    });
    return new DayList([dayItem]);
  }

  get _dayList() {
    return this._currentSort === `event` ? this._groupedDayList : this._sortedDayList;
  }

  _renderTripEventsSection() {
    unrender(this._tripEventsSection);
    if (this._points.length > 0) {
      this._sort = new DayListHeader({
        columns: this._visibleColumns,
        current: this._currentSort,
        onSort: this.onSort.bind(this),
      });
      render(this._tripEventsSection.element, this._sort);
      render(this._tripEventsSection.element, this._dayList);
    } else {
      render(this._tripEventsSection.element, this._noPoints);
    }
    render(this._container, this._tripEventsSection);
  }

  onSort(method) {
    this._currentSort = method;
    this.init();
  }

  init() {
    this._renderTripEventsSection();
  }
}
