import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'air-table-5',
  templateUrl: './5.component.html',
})
export class AirTable5Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
