import {labels} from "./data";
import moment from "moment";

export class PointModel {
  constructor({id, startTime, endTime, price, isFavorite, offers, type, destination}) {
    this.id = id || null;
    this.startTime = startTime;
    this.endTime = endTime;
    this.price = price;
    this.isFavorite = isFavorite || false;
    this.offers = offers || [];
    this.type = type;
    this.destination = destination || {name: ``, description: ``, pictures: []};
  }

  static parsePoint(data) {
    return new PointModel({
      id: data[`id`],
      type: data[`type`],
      price: data[`base_price`],
      startTime: new Date(data[`date_from`]),
      endTime: new Date(data[`date_to`]),
      isFavorite: data[`is_favorite`],
      destination: data[`destination`],
      offers: data[`offers`],
    });
  }

  static raw(point) {
    return ({
      id: point.id,
      type: point.type,
      [`base_price`]: point.price,
      [`date_from`]: point.startTime.valueOf(),
      [`date_to`]: point.endTime.valueOf(),
      [`is_favorite`]: point.isFavorite,
      destination: point.destination,
      offers: point.offers,
    });
  }

  static parsePoints(data) {
    return data.map((it) => PointModel.parsePoint(it));
  }

  _getOffersTotal() {
    return this.offers.filter((it) => it.accepted).reduce((acc, it) => acc + it.price, 0);
  }
  get total() {
    return this._getOffersTotal() + this.price;
  }
  get title() {
    return this.label + ` ` + this.destination.name;
  }
  get label() {
    return labels[this.type];
  }
  get duration() {
    const d = moment.duration(moment(this.endTime).diff(moment(this.startTime)));

    const days = d.days() <= 0 ? `` : `${d.days() < 10 ? `0` : ``}${d.days()}D`;
    const hours = d.hours() <= 0 ? `` : `${d.hours() < 10 ? `0` : ``}${d.hours()}H`;
    const minutes = d.minutes() <= 0 ? `` : `${d.minutes() < 10 ? `0` : ``}${d.minutes()}M`;

    return `${days} ${hours} ${minutes}`.trim();
  }


}
