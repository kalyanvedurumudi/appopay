import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-badge-example',
  templateUrl: './badge.component.html',
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      .head-example {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
      }
    `,
  ],
})
export class AirAntdBadgeExampleComponent {}
