import "../node_modules/flatpickr/dist/flatpickr.min.css";
import {PageController} from "./controllers/page-controller";
import {route} from "./data";
import {api} from "./api";

const pageController = new PageController({
  tripHeaderContainer: document.querySelector(`.trip-main`),
  tripBodyContainer: document.querySelector(`main .page-body__container`),
  route
});
pageController.init();


const onSuccess = (title, result) => {
  console.log(title);
  console.dir(result)
};

api.getPoints().then(onSuccess.bind(null, `points`));
api.getDestinations().then(onSuccess.bind(null, `destinations`));
api.getOffers().then(onSuccess.bind(null, `offers`));
