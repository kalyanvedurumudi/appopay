import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-select-example',
  templateUrl: './select.component.html',
  styles: [
    `
      nz-select {
        margin-right: 8px;
      }
    `,
  ],
})
export class AirAntdSelectExampleComponent {
  selectedValue = 'lucy'
}
