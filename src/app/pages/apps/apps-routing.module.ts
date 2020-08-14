import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// Apps
import { AppsMessagingComponent } from 'src/app/pages/apps/messaging/messaging.component'
import { AppsCalendarComponent } from 'src/app/pages/apps/calendar/calendar.component'
import { AppsProfileComponent } from 'src/app/pages/apps/profile/profile.component'
import { AppsGalleryComponent } from 'src/app/pages/apps/gallery/gallery.component'
import { AppsMailComponent } from 'src/app/pages/apps/mail/mail.component'

const routes: Routes = [
  {
    path: 'messaging',
    component: AppsMessagingComponent,
    data: { title: 'Messaging App' },
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: AppsCalendarComponent,
    data: { title: 'Calendar App' },
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: AppsProfileComponent,
    data: { title: 'Profile App' },
    canActivate: [AuthGuard],
  },
  {
    path: 'gallery',
    component: AppsGalleryComponent,
    data: { title: 'Gallery App' },
    canActivate: [AuthGuard],
  },
  {
    path: 'mail',
    component: AppsMailComponent,
    data: { title: 'Mail App' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AppsRouterModule {}
