import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-calendar-example',
  templateUrl: './calendar.component.html',
})
export class AirAntdCalendarExampleComponent {
  date = new Date(2012, 11, 21)
  mode = 'month'

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode)
  }
}
