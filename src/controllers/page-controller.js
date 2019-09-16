import {TripInfo} from "../components/trip-info";
import {NewEventButton} from "../components/new-event-btn";
import {TripControls} from "../components/trip-controls";
import {Menu} from "../components/menu";
import {Filter} from "../components/filter";

import {menuData, filterMethods} from "../data";
import {render, rerender} from "../utils";
import {TripController} from "./trip-controller";
import {StatisticsSection} from "../components/statistics-sec";

export class PageController {
  constructor({tripHeaderContainer, tripBodyContainer, route}) {
    this._route = route;

    this._header = tripHeaderContainer;
    this._body = tripBodyContainer;

    this._tripInfo = new TripInfo({data: route});
    this._tripControls = new TripControls({
      children: [
        new Menu({
          data: {menuData, activeItem: `table`}
        }),
        new Filter({
          data: {filterMethods, currentFilter: `everything`}
        }),
      ]
    });
    this._newEventBtn = new NewEventButton();
  }

  _renderHeader() {
    rerender(this._tripInfo, this._header);
    rerender(this._tripControls, this._header);
    rerender(this._newEventBtn, this._header);
    console.log(`start`);
    this._tripControls.attachEventHandlers();
  }

  init() {
    this._renderHeader();

    this.pages = [
      new TripController({
        points: this._route.points,
        onDataChange: () => this._renderHeader()
      }),
      new StatisticsSection()
    ];
    this.pages.forEach((page) => {
      render(this._body, page);
      page.hide();
    });
    this.pages[0].show();
  }
}
