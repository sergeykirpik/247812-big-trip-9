import "../node_modules/flatpickr/dist/flatpickr.min.css";
import {PageController} from "./controllers/page-controller";
import {api} from "./api";
import {Route} from "./route";
import {PointModel} from "./point-model";
import {destinationList} from "./data";

const init = (data) => {
  console.dir(data);
  const pageController = new PageController({
    tripHeaderContainer: document.querySelector(`.trip-main`),
    tripBodyContainer: document.querySelector(`main .page-body__container`),
    route: new Route(PointModel.parsePoints(data)),
  });
  pageController.init();
};

const onSuccess = (title, result) => {
  console.log(title);
  console.dir(result);
};

api.getOffers()
  .then(onSuccess.bind(null, `offers`))
  .then(() => api.getDestinations())
  .then((list) => {
    console.dir(list);
    destinationList.list = list;
  })
  .then(() => api.getPoints())
  .then(init);

