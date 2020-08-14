import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-form-example',
  templateUrl: './form.component.html',
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }

      nz-date-picker ::ng-deep .ant-calendar-picker {
        width: 100%;
      }

      nz-date-picker,
      nz-time-picker {
        width: 100%;
      }
    `,
  ],
})
export class AirAntdFormExampleComponent {}
