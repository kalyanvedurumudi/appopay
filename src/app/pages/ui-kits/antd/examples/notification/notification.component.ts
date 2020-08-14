import { Component } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'air-antd-notification-example',
  templateUrl: './notification.component.html',
})
export class AirAntdNotificationExampleComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    )
  }
}
