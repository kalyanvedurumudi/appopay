import { Component, OnInit } from '@angular/core'
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'air-bootstrap-datepicker-example',
  templateUrl: './datepicker.component.html',
})
export class AirBootstrapDatepickerExampleComponent implements OnInit {
  model: NgbDateStruct
  date: { year: number; month: number }

  constructor(private calendar: NgbCalendar) {}

  selectToday() {
    this.model = this.calendar.getToday()
  }

  ngOnInit() {}
}
