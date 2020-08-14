import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-drawer-example',
  templateUrl: './drawer.component.html',
})
export class AirAntdDrawerExampleComponent {
  visible = false

  open(): void {
    this.visible = true
  }

  close(): void {
    this.visible = false
  }
}
