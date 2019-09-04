import {TripEventsSection} from "../components/trip-events-sec";
import {formatDate, groupBy, rerender} from "../utils";
import {SortType} from "../data";
import {DayList} from "../components/day-list";
import {NoPoints} from "../components/no-points";
import {DayListHeader} from "../components/day-list-header";
import {DayItem} from "../components/day-item";
import {EventListController} from "./event-list-controller";
import {BaseComponent} from "../base-component";

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

export class TripController extends BaseComponent {
  constructor(points) {
    super({});
    this._points = points;
    this._sort = null;
    this._noPoints = new NoPoints({});
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
      eventList: new EventListController(it),
      dayCounter: it[0].dayNo,
      dayDate: formatDate(it[0].startTime, `YYYY-MM-DD`),
    }));
    return new DayList(dayItems);
  }

  get _sortedDayList() {
    const dayItem = new DayItem({
      eventList: new EventListController(this._sortedPoints)
    });
    return new DayList([dayItem]);
  }

  get _dayList() {
    return this._currentSort === `event` ? this._groupedDayList : this._sortedDayList;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    if (this._sortedPoints.length > 0) {
      this._sort = new DayListHeader({
        columns: this._visibleColumns,
        current: this._currentSort,
        onSort: this.onSort.bind(this),
      });
      this._element = new TripEventsSection({children: [
        this._sort,
        this._dayList
      ]}).element;
    } else {
      this._element = new TripEventsSection({children: [
        this._noPoints
      ]}).element;
    }
    return this._element;
  }

  onSort(method) {
    this._currentSort = method;
    rerender(this);
  }

}
