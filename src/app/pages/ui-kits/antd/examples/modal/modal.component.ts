import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-modal-example',
  templateUrl: './modal.component.html',
})
export class AirAntdModalExampleComponent {
  isVisible = false

  constructor() {}

  showModal(): void {
    this.isVisible = true
  }

  handleOk(): void {
    console.log('Button ok clicked!')
    this.isVisible = false
  }

  handleCancel(): void {
    console.log('Button cancel clicked!')
    this.isVisible = false
  }
}
