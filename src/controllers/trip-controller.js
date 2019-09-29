import {TripEventsSection} from "../components/trip-events-sec";
import {groupBy, rerender} from "../utils";
import {SortType, FilterType} from "../data";
import {PointModel} from "../point-model";
import {DayList} from "../components/day-list";
import {NoPoints} from "../components/no-points";
import {DayListHeader} from "../components/day-list-header";
import {DayItem} from "../components/day-item";
import {EventListController} from "./event-list-controller";
import {BaseComponent} from "../base-component";
import moment from "moment";
import {PointController} from "./point-controller";
import {api} from "../api";
import {dataProvider} from "../data-provider";

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
  constructor(route) {
    super({data: route.points});
    this._route = route;
    this._sort = null;
    this._noPoints = new NoPoints();
    this._currentSort = `event`;
    this._currentFilter = `everything`;
    this._isInAddingMode = false;
    this._editForm = null;

    route.addOnDataChangedCallback(() => {
      this._data = route.points;
      rerender(this);
    });
  }

  _onDataChange(point) {
    api.editPoint(point)
      .then(() => this._route.getPoints());
  }

  _onDataAdd(newPoint) {
    api.addPoint(newPoint)
      .then(() => this._route.getPoints());
  }

  _onDataRemove(id) {
    api.removePoint(id)
      .then(() =>this._route.getPoints());
  }

  get _filteredPoints() {
    return FilterType[this._currentFilter](this._data);
  }

  get _pointsByDay() {
    const sorted = this._filteredPoints.sort((p1, p2) => p1.startTime.valueOf() - p2.startTime.valueOf());
    return groupBy(sorted, (a, b) =>
      moment(a.startTime).format(`YYYY-MM-DD`) === moment(b.startTime).format(`YYYY-MM-DD`));
  }

  get _sortedPoints() {
    return SortType[this._currentSort](this._filteredPoints);
  }

  get _visibleColumns() {
    return this._currentSort === `event` ? columns
      : columns.map((it) => it.title === `day` ? {...it, title: ``} : it);
  }

  get _groupedDayList() {
    let dayCounter = 1;
    const dayItems = this._pointsByDay.map((it) => new DayItem({
      children: [new EventListController({data: it, route: this._route})],
      data: {
        dayCounter: dayCounter++,
        dayDate: moment(it[0].startTime).format(`YYYY-MM-DD`),
      }
    }));
    return new DayList({children: dayItems});
  }

  get _sortedDayList() {
    const dayItem = new DayItem({
      children: [new EventListController({data: this._sortedPoints, callbacks: {
        onDataChange: this._onDataChange.bind(this),
        onDataAdd: this._onDataAdd.bind(this),
        onDataRemove: this._onDataRemove.bind(this),
      }})],
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
    let children = [this._editForm, this._noPoints];
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
      children = [this._sort, this._editForm, this._dayList];
    }
    this._element = new TripEventsSection({children}).element;
    return this._element;
  }

  onSort(method) {
    this._currentSort = method;
    rerender(this);
  }

  addNewPoint() {
    if (this._editForm) {
      return;
    }
    this._editForm = new PointController({
      route: this._route,
      data: new PointModel({
        type: dataProvider.offers[0].type,
        offers: dataProvider.offers[0].offers.slice(),
        startTime: new Date(),
        endTime: new Date(),
      }),
      callbacks: {
        onDataAdd: (newPoint) => {
          this._editForm = null;
          this._onDataAdd(newPoint);
        },
        onDismiss: () => {
          this._editForm = null;
        }
      },
      isInEditMode: true
    });
    rerender(this);
  }

  applyFilter(filter) {
    this._currentFilter = filter;
    rerender(this);
  }
}
