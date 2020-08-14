import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-table-1',
  templateUrl: './1.component.html',
})
export class AirTable1Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
