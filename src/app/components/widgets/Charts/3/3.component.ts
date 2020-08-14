import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-3',
  templateUrl: './3.component.html',
})
export class AirChart3Component implements OnInit {
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

  events = {
    draw: item => {
      if (item.type === 'bar') {
        item.group.elem('line', {
          x1: item.x1,
          x2: item.x2,
          y1: item.y2,
          y2: 0,
          stroke: '#e4e9f0',
          'stroke-width': '10',
        })
      }
    },
  }

  constructor() {}
  ngOnInit() {}
}
