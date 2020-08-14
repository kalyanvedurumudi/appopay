import { Component, ViewChild, AfterViewChecked } from '@angular/core'
import { ChartComponent } from 'angular2-chartjs'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-9',
  templateUrl: './9.component.html',
  styleUrls: ['./9.component.scss'],
})
export class AirChart9Component implements AfterViewChecked {
  @ViewChild(ChartComponent, { static: false }) chart: ChartComponent
  @ViewChild('tooltip', { static: false }) tooltip
  @ViewChild('legend', { static: false }) legend
  chartData = data
  options = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
      custom: tooltipData => {
        const tooltipEl = this.tooltip.nativeElement
        tooltipEl.style.opacity = 1
        if (tooltipData.opacity === 0) {
          tooltipEl.style.opacity = 0
        }
      },
      callbacks: {
        label: (tooltipItem, itemData) => {
          const dataset = itemData.datasets[0]
          const value = dataset.data[tooltipItem.index]
          this.tooltip.nativeElement.innerHTML = value
        },
      },
    },
    legendCallback: chart => {
      const { labels } = chart.data
      const legendMarkup = []
      const dataset = chart.data.datasets[0]
      legendMarkup.push('<div class="flex-shrink-0">')
      let legends = labels.map((label, index) => {
        const color = dataset.backgroundColor[index]
        return `<div class="d-flex align-items-center flex-nowrap mt-2 mb-2">
                  <div class="air__utils__tablet mr-3" style="background-color: ${color}"></div>
                  ${label}
                  </div>`
      })
      legends = legends.join('')
      legendMarkup.push(legends)
      legendMarkup.push('</div>')
      this.legend.nativeElement.innerHTML = legendMarkup.join('')
    },
  }
  constructor() {}
  ngAfterViewChecked() {
    this.chart.chart.generateLegend()
  }
}
