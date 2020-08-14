import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-table-2',
  templateUrl: './2.component.html',
})
export class AirTable2Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
