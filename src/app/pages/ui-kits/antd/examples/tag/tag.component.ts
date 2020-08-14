import { Component } from '@angular/core'

@Component({
  selector: 'air-antd-tag-example',
  templateUrl: './tag.component.html',
})
export class AirAntdTagExampleComponent {
  onClose(): void {
    console.log('tag was closed.')
  }

  afterClose(): void {
    console.log('after tag closed')
  }

  preventDefault(e: Event): void {
    e.preventDefault()
    e.stopPropagation()
    console.log('tag can not be closed.')
  }
}
