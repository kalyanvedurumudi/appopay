import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'air-bootstrap-timepicker-example',
  templateUrl: './timepicker.component.html',
})
export class AirBootstrapTimepickerExampleComponent implements OnInit {
  time = { hour: 13, minute: 30 }

  constructor() {}

  ngOnInit() {}
}
