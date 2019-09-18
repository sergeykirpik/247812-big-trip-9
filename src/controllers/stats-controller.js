import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {StatisticsSection} from "../components/statistics-sec";
import {BaseComponent} from "../base-component";

const CHART_WIDTH = 900;
const CHART_BAR_HEIGHT = 30;
const CHART_MIN_HEIGHT = 150;

const rnd = (max) => Math.floor(Math.random() * max);

const getRandomColor = () => `rgba(${rnd(128) + 128}, ${rnd(128) + 128}, ${rnd(128) + 128}, 0.5)`;

export class StatsController extends BaseComponent {

  constructor(params) {
    super(params);
    Chart.pluginService.register(ChartDataLabels);
  }

  _afterShow() {
    this.updateStatistics();
  }

  get element() {
    if (!this._element) {
      this._element = new StatisticsSection().element;
    }
    return this._element;
  }

  get _moneyStats() {
    const result = this._data.reduce((acc, v) => {
      if (!acc[v.type]) {
        acc[v.type] = 0;
      }
      acc[v.type] += v.price;
      return acc;
    }, {});
    return ({
      labels: Object.keys(result).map((it) => it.toUpperCase()),
      data: Object.values(result),
    });
  }

  get _transportStats() {
    const result = this._data.reduce((acc, v) => {
      if (!acc[v.type]) {
        acc[v.type] = 0;
      }
      acc[v.type] += 1;
      return acc;
    }, {});
    return ({
      labels: Object.keys(result).map((it) => it.toUpperCase()),
      data: Object.values(result),
    });
  }

  get _timeSpentStats() {
    return ({
      labels: this._data.map((p) => p.title.toUpperCase()),
      data: this._data.map((p) => moment(p.endTime).diff(p.startTime, `hours`)),
    });
  }

  updateStatistics() {

    (this._charts || []).forEach((c) => c.destroy());

    const moneyChart = this._drawChart({
      ctx: this._element.querySelector(`.statistics__chart--money`).getContext(`2d`),
      title: `MONEY`,
      // labels: [`✈️ FLY`, `🏨 STAY`, `🚗 DRIVE`, `🏛 LOOK`, `🍕 EAT`, `🚕 RIDE`],
      // data: [400, 300, 200, 160, 150, 100],
      ...this._moneyStats,
      formatter: (value) => `€ ${value}`,
    });
    const transportChart = this._drawChart({
      ctx: this._element.querySelector(`.statistics__chart--transport`).getContext(`2d`),
      title: `TRANSPORT`,
      // labels: [`🚗 DRIVE`, `🚕 RIDE`, `✈️ FLY`, `🛳 SAIL`],
      // data: [4, 3, 2, 1],
      ...this._transportStats,
      formatter: (value) => `${value}x`,
    });
    const timeSpentChart = this._drawChart({
      ctx: this._element.querySelector(`.statistics__chart--time`).getContext(`2d`),
      title: `TIME SPENT`,
      // labels: [`🛳 HOTEL`, `🚕 TO AIRPORT`, `🚗 TO GENEVA`, `🚕 TO CHAMONIX`],
      // data: [72, 1, 3, 2],
      ...this._timeSpentStats,
      formatter: (value) => `${value}H`,
    });

    this._charts = [moneyChart, transportChart, timeSpentChart];
  }

  _drawChart({ctx, title, labels, data, formatter}) {
    const chart = new Chart(ctx, {
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          borderColor: `rgba(0, 0, 0, 0.25)`,
          backgroundColor: labels.map(() => getRandomColor()),
          borderWidth: 1,
        }],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            align: `start`,
            anchor: `end`,
            font: {
              style: `bold`,
            },
            formatter,
          }
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            minBarLength: 40,
            ticks: {
              beginAtZero: true,
            },
            display: false,
          }],
          yAxes: [{
            barPercentage: 1.0,
            scaleLabel: {
              display: true,
              fontSize: 18,
              fontStyle: `bold`,
              labelString: title,
            },
            ticks: {
              fontStyle: `bold`,
            },
            gridLines: {
              display: false,
            }
          }],
        }
      }
    });
    chart.canvas.parentNode.style.width = `${CHART_WIDTH}px`;
    chart.canvas.parentNode.style.height = `${Math.max(CHART_BAR_HEIGHT * labels.length, CHART_MIN_HEIGHT)}px`;
    return chart;
  }
}

