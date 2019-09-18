import {BaseComponent} from "../base-component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const CHART_WIDTH = 900;
const CHART_BAR_HEIGHT = 30;

const rnd = (max) => Math.floor(Math.random() * max);

const getRandomColor = () => `rgba(${rnd(128) + 128}, ${rnd(128) + 128}, ${rnd(128) + 128}, 0.5)`;

export class StatisticsSection extends BaseComponent {
  get element() {
    if (this._element) {
      return this._element;
    }
    debugger;
    this._element = super.element;
    this._drawChart({
      ctx: this._element.querySelector(`.statistics__chart--money`).getContext(`2d`),
      title: `MONEY`,
      labels: [`✈️ FLY`, `🏨 STAY`, `🚗 DRIVE`, `🏛 LOOK`, `🍕 EAT`, `🚕 RIDE`],
      data: [400, 300, 200, 160, 150, 100],
      formatter: (value) => `€ ${value}`,
    });
    this._drawChart({
      ctx: this._element.querySelector(`.statistics__chart--transport`).getContext(`2d`),
      title: `TRANSPORT`,
      labels: [`🚗 DRIVE`, `🚕 RIDE`, `✈️ FLY`, `🛳 SAIL`],
      data: [4, 3, 2, 1],
      formatter: (value) => `${value}x`,
    });
    this._drawChart({
      ctx: this._element.querySelector(`.statistics__chart--time`).getContext(`2d`),
      title: `TIME SPENT`,
      labels: [`🛳 HOTEL`, `🚕 TO AIRPORT`, `🚗 TO GENEVA`, `🚕 TO CHAMONIX`],
      data: [72, 1, 3, 2],
      formatter: (value) => `${value}H`,
    });

    return this._element;
  }

  _drawChart({ctx, title, labels, data, formatter}) {
    const chart = new Chart(ctx, {
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          borderColor: `rgba(0, 0, 0, 0.25)`,
          backgroundColor: new Array(5).fill(``).map(() => getRandomColor()),
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
    chart.canvas.parentNode.style.height = `${CHART_BAR_HEIGHT * labels.length}px`;
  }

  get template() {
    return `
    <section class="statistics">
      <h2>Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`.trim();
  }
}

