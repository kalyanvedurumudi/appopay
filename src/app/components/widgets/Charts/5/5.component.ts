import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-5',
  templateUrl: './5.component.html',
  styleUrls: ['./5.component.scss'],
})
export class AirChart5Component implements OnInit {
  chartData = data
  chartOptions = {
    stackBars: true,
    fullWidth: true,
    chartPadding: {
      right: 0,
      left: 0,
      top: 5,
      bottom: 0,
    },
    low: 0,
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    axisX: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    seriesBarDistance: 5,
  }
  constructor() {}
  ngOnInit() {}
}
