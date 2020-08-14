import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-dashboard-crypto',
  templateUrl: './crypto.component.html',
})
export class DashboardCryptoComponent implements OnInit {
  chartData = data
  chartOptions = {
    fullWidth: !0,
    chartPadding: {
      right: 15,
      left: -15,
    },
    low: 0,
    showArea: true,
  }
  constructor() {}
  ngOnInit() {}
}
