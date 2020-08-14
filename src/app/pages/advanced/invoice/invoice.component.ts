import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-advanced-invoice',
  templateUrl: './invoice.component.html',
})
export class AdvancedInvoiceComponent implements OnInit {
  isAllDisplayDataChecked = false
  isIndeterminate = false
  listOfDisplayData = data
  listOfAllData = data
  mapOfCheckedId = { 1: true, 2: true, 3: true }

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

  ngOnInit(): void {}
}
