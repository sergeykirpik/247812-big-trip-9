import {TripInfo} from "../components/trip-info";
import {NewEventButton} from "../components/new-event-btn";
import {TripControls} from "../components/trip-controls";
import {Menu} from "../components/menu";
import {Filter} from "../components/filter";

import {menuData, FilterType} from "../data";
import {render, unrender} from "../utils";
import {TripController} from "./trip-controller";
import {StatsController} from "./stats-controller";

export class PageController {
  constructor({tripHeaderContainer, tripBodyContainer, route}) {
    this._route = route;

    this._header = tripHeaderContainer;
    this._body = tripBodyContainer;

    this._newEventBtn = new NewEventButton({callbacks: {onClick: this._addNewPoint.bind(this)}});

    this._tripController = new TripController(this._route);

    this._pages = {
      table: this._tripController,
      stats: new StatsController({data: this._route.points}),
    };
    this._activePage = `table`;
    this._currentFilter = `everything`;
  }

  _addNewPoint() {
    this._tripController.addNewPoint();
  }

  _showPage(name) {
    this._activePage = name;
    Object.values(this._pages).forEach((page) => page.hide());
    this._pages[name].show();
    this._renderHeader();

    this._filter.setVisibility(this._activePage === `table`);
  }

  _applyFilter(filter) {
    this._currentFilter = filter;
    this._tripController.applyFilter(filter);
  }

  _renderHeader() {
    unrender(this._tripInfo, false);
    unrender(this._tripControls, false);
    unrender(this._newEventBtn, false);

    this._filter = new Filter({
      data: {filterMethods: FilterType, currentFilter: this._currentFilter},
      callbacks: {onFilter: (filter) => this._applyFilter(filter)}
    });

    this._tripControls = new TripControls({
      children: [
        new Menu({
          data: {menuData, activeItem: this._activePage},
          callbacks: {onAction: (action) => this._showPage(action)}
        }),
        this._filter,
      ]
    });

    this._tripInfo = new TripInfo({data: this._route});

    render(this._header, this._tripInfo);
    render(this._header, this._tripControls);
    render(this._header, this._newEventBtn);
  }

  init() {
    this._route.addOnDataChangedCallback(() => {
      this._showPage(this._activePage);
    });
    // this._renderHeader();
    Object.values(this._pages).forEach((page) => {
      render(this._body, page);
      page.hide();
    });
    // this._showPage(this._activePage);
    this._route.getPoints();
  }
}
