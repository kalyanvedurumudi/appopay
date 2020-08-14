import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-4',
  templateUrl: './4.component.html',
})
export class AirChart4Component implements OnInit {
  chartData = data
  chartOptions = {
    chartPadding: {
      right: 0,
      left: 0,
      top: 5,
      bottom: 5,
    },
    fullWidth: true,
    showPoint: false,
    lineSmooth: true,
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
    showArea: false,
  }
  constructor() {}
  ngOnInit() {}
}
