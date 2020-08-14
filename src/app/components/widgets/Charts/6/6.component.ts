import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-6',
  templateUrl: './6.component.html',
  styleUrls: ['./6.component.scss'],
})
export class AirChart6Component implements OnInit {
  chartData = data
  chartOptions = {
    low: 0,
    chartPadding: {
      right: 0,
      left: 0,
      top: 5,
      bottom: 0,
    },
    fullWidth: true,
    showPoint: false,
    lineSmooth: false,
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
    showArea: true,
  }
  constructor() {}
  ngOnInit() {}
}
