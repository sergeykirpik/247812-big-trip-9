import "../node_modules/flatpickr/dist/flatpickr.min.css";
import {PageController} from "./controllers/page-controller";
import {Route} from "./route";
import {dataProvider} from "./data-provider";

const init = () => {
  const pageController = new PageController({
    tripHeaderContainer: document.querySelector(`.trip-main`),
    tripBodyContainer: document.querySelector(`main .page-body__container`),
    route: new Route(),
  });
  pageController.init();
};

dataProvider.load().then(init);

