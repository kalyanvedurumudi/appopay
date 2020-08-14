import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-8',
  templateUrl: './8.component.html',
})
export class AirChart8Component implements OnInit {
  isAllDisplayDataChecked = false
  isIndeterminate = false
  listOfDisplayData = data
  listOfAllData = data
  mapOfCheckedId = { 1: true, 2: true, 3: true }
  chartOptions = {
    width: '110px',
    height: '50px',
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

  currentPageDataChange($event): void {
    this.listOfDisplayData = $event
    this.refreshStatus()
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id])
    this.isIndeterminate =
      this.listOfDisplayData
        .filter(item => !item.disabled)
        .some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked
  }

  checkAll(value): void {
    this.listOfDisplayData
      .filter(item => !item.disabled)
      .forEach(item => (this.mapOfCheckedId[item.id] = value))
    this.refreshStatus()
  }
  constructor() {}
  ngOnInit() {}
}
