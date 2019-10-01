import "../node_modules/flatpickr/dist/flatpickr.min.css";
import {PageController} from "./controllers/page-controller";
import {dataProvider} from "./services/data-provider";
import {eventEmmiter} from "./services/event-emmiter";
import {KeyCode} from "./utils";

const pageController = new PageController({
  tripHeaderContainer: document.querySelector(`.trip-main`),
  tripBodyContainer: document.querySelector(`main .page-body__container`),
});
pageController.init();

dataProvider.load();

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KeyCode.ENTER:
      eventEmmiter.emit(`keydown_ENTER`);
      break;
    case KeyCode.ESC:
      eventEmmiter.emit(`keydown_ESC`);
      break;
  }
}, true);

