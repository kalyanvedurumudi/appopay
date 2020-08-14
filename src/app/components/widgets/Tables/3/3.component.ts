import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-table-3',
  templateUrl: './3.component.html',
})
export class AirTable3Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
