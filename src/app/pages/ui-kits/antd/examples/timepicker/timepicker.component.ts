import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-timepicker-example',
  templateUrl: './timepicker.component.html',
})
export class AirAntdTimePickerExampleComponent {
  time: Date | null = null
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0)
}
