import {TripEventsSection} from "../components/trip-events-sec";
import {groupBy, rerender} from "../utils";
import {SortType} from "../data";
import {DayList} from "../components/day-list";
import {NoPoints} from "../components/no-points";
import {DayListHeader} from "../components/day-list-header";
import {DayItem} from "../components/day-item";
import {EventListController} from "./event-list-controller";
import {BaseComponent} from "../base-component";
import moment from "moment";

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
  constructor({points, onDataChange}) {
    super({data: points});
    this._sort = null;
    this._noPoints = new NoPoints();
    this._currentSort = `event`;
    this._onDataChangeParentCallback = onDataChange;
  }

  _onDataChange(oldPoint, newPoint) {
    // console.log(oldPoint, newPoint);
    const index = this._data.findIndex((it) => it === oldPoint);
    this._data[index] = newPoint;
    rerender(this);
    this._onDataChangeParentCallback();
  }

  get _pointsByDay() {
    return groupBy(this._data, (a, b) =>
      moment(a.startTime).format(`YYYY-MM-DD`) === moment(b.startTime).format(`YYYY-MM-DD`));
  }

  get _sortedPoints() {
    return SortType[this._currentSort](this._data);
  }

  get _visibleColumns() {
    return this._currentSort === `event` ? columns
      : columns.map((it) => it.title === `day` ? {...it, title: ``} : it);
  }

  get _groupedDayList() {
    let dayCounter = 1;
    const dayItems = this._pointsByDay.map((it) => new DayItem({
      children: [new EventListController({data: it, callbacks: {
        onDataChange: this._onDataChange.bind(this),
      }})],
      data: {
        dayCounter: dayCounter++,
        dayDate: moment(it[0].startTime).format(`YYYY-MM-DD`),
      }
    }));
    return new DayList({children: dayItems});
  }

  get _sortedDayList() {
    const dayItem = new DayItem({
      children: [new EventListController({data: this._sortedPoints})]
    });
    return new DayList({children: [dayItem]});
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
        data: {
          columns: this._visibleColumns,
          current: this._currentSort,
        },
        callbacks: {
          onSort: this.onSort.bind(this),
        }
      });
      this._element = new TripEventsSection({
        children: [this._sort, this._dayList]
      }).element;

    } else {
      this._element = new TripEventsSection({
        children: [this._noPoints]
      }).element;
    }

    return this._element;
  }

  onSort(method) {
    this._currentSort = method;
    rerender(this);
  }

}
