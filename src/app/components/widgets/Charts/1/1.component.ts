import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-1',
  templateUrl: './1.component.html',
  styleUrls: ['./1.component.scss'],
})
export class AirChart1Component implements OnInit {
  chartData = data
  chartOptions = {
    seriesBarDistance: 10,
    horizontalBars: true,
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
  }
  constructor() {}
  ngOnInit() {}
}
