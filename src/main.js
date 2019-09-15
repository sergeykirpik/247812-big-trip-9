import '../node_modules/flatpickr/dist/flatpickr.min.css';
import {PageController} from './controllers/page-controller';
import {route} from './data';

const pageController = new PageController({
  tripHeaderContainer: document.querySelector(`.trip-main`),
  tripBodyContainer: document.querySelector(`main .page-body__container`),
  route
});
pageController.init();
