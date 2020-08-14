import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { AppsRouterModule } from './apps-routing.module'
import { FormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { WidgetsComponentsModule } from 'src/app/components/widgets/widgets-components.module'

// Apps
import { AppsMessagingComponent } from 'src/app/pages/apps/messaging/messaging.component'
import { AppsCalendarComponent } from 'src/app/pages/apps/calendar/calendar.component'
import { AppsProfileComponent } from 'src/app/pages/apps/profile/profile.component'
import { AppsGalleryComponent } from 'src/app/pages/apps/gallery/gallery.component'
import { AppsMailComponent } from 'src/app/pages/apps/mail/mail.component'

const COMPONENTS = [
  AppsMessagingComponent,
  AppsCalendarComponent,
  AppsProfileComponent,
  AppsGalleryComponent,
  AppsMailComponent,
]

@NgModule({
  imports: [
    SharedModule,
    AppsRouterModule,
    FormsModule,
    PerfectScrollbarModule,
    WidgetsComponentsModule,
  ],
  declarations: [...COMPONENTS],
})
export class AppsModule {}
