import "../node_modules/flatpickr/dist/flatpickr.min.css";
import {PageController} from "./controllers/page-controller";
import {api} from "./api";
import {Route} from "./route";
import {PointModel} from "./point-model";
import {dataProvider} from "./data-provider";

const init = () => {
  console.dir(dataProvider.points);
  const pageController = new PageController({
    tripHeaderContainer: document.querySelector(`.trip-main`),
    tripBodyContainer: document.querySelector(`main .page-body__container`),
    route: new Route(PointModel.parsePoints(dataProvider.points)),
  });
  pageController.init();
};

dataProvider.load().then(init);

