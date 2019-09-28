import moment from "moment";

export class Route {
  constructor(points) {
    this.points = points;
  }

  get cost() {
    return this.points.reduce((acc, it) => acc + it.total, 0);
  }

  get title() {
    if (this.points.length === 0) {
      return ``;
    }
    if (this.points.length > 3) {
      return [
        this.points[0].destination.name,
        this.points[this.points.length - 1].destination.name
      ].join(` &mdash; ... &mdash; `);
    }
    return this.points.map((it) => it.destination.name).join(` &mdash; `);
  }

  get dates() {
    if (this.points.length === 0) {
      return ``;
    }
    return [
      moment(this.points[0].startTime).format(`MMM D`),
      moment(this.points[this.points.length - 1].endTime).format(`MMM D`),
    ].join(` &mdash; `);
  }

}

