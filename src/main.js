import "../node_modules/flatpickr/dist/flatpickr.min.css";
import {PageController} from "./controllers/page-controller";
import {dataProvider} from "./data-provider";
import {eventEmmiter} from "./event-emmiter";

const init = () => {
  const pageController = new PageController({
    tripHeaderContainer: document.querySelector(`.trip-main`),
    tripBodyContainer: document.querySelector(`main .page-body__container`),
  });
  pageController.init();
};

dataProvider.load().then(init);

document.addEventListener(`click`, (evt) => {
  eventEmmiter.emit(evt);
}, false);

