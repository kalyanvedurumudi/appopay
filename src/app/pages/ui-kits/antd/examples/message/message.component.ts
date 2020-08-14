import { Component } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'air-antd-message-example',
  templateUrl: './message.component.html',
})
export class AirAntdMessageExampleComponent {
  constructor(private message: NzMessageService) {}

  createBasicMessage(): void {
    this.message.info('This is a normal message')
  }
}
