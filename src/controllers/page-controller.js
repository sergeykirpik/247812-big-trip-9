import {TripInfo} from "../components/trip-info";
import {NewEventButton} from "../components/new-event-btn";
import {TripControls} from "../components/trip-controls";
import {Menu} from "../components/menu";
import {Filter} from "../components/filter";

import {menuData, filterMethods} from "../data";
import {render, rerender} from "../utils";
import {TripController} from "./trip-controller";

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
  }

  init() {
    this._renderHeader();
    render(this._body, new TripController({
      points: this._route.points,
      onDataChange: () => this._renderHeader()
    }));
  }
}
