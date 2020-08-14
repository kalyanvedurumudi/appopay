import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-chart-7',
  templateUrl: './7.component.html',
})
export class AirChart7Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
