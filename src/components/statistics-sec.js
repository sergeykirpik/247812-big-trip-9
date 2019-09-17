import {BaseComponent} from "../base-component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export class StatisticsSection extends BaseComponent {
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = super.element;
    this._drawMoneyChart(this._element.querySelector(`.statistics__chart--money`).getContext(`2d`));

    return this._element;
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

  _drawMoneyChart(ctx) {
    let chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        datasets: [{
          data: [10, 20, 30, 40, 50, 60]
        }],
        labels: ['January', 'February', 'March', 'April', 'May', 'June']
      },
      options: {
        plugins: {
          datalabels: {
            //color: `#36A2EB`
            align: `start`,
            anchor: `end`,
            font: {
              style: `bold`,
            },
            formatter: (value, context) => `€ ${value}`
          }
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
            }
          }],
          yAxes: [{
            minBarLength: 100,
            type: `category`,
            labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `EAT`, `RIDE`],
            scaleLabel: {
              display: true,
              labelString: `MONEY`,
              fontSize: 18,
              fontStyle: `bold`,
            },
          }]
        }
      }
    });
  }
}
