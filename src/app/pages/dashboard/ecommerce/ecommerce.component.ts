import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-dashboard-ecommerce',
  templateUrl: './ecommerce.component.html',
})
export class DashboardEcommerceComponent implements OnInit {
  products = data
  constructor() {}
  ngOnInit() {}
}
