import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// icons
import { IconsFontawesomeComponent } from 'src/app/pages/icons/fontawesome/fontawesome.component'
import { IconsIcomoonComponent } from 'src/app/pages/icons/icomoon-free/icomoon.component'
import { IconsLinearComponent } from 'src/app/pages/icons/linearicons-free/linear.component'
import { IconsFeatherComponent } from 'src/app/pages/icons/feather-icons/feather.component'

const routes: Routes = [
  {
    path: 'fontawesome',
    component: IconsFontawesomeComponent,
    data: { title: 'Fontawesome' },
    canActivate: [AuthGuard],
  },
  {
    path: 'icomoon-free',
    component: IconsIcomoonComponent,
    data: { title: 'Icomoon Free' },
    canActivate: [AuthGuard],
  },
  {
    path: 'linearicons-free',
    component: IconsLinearComponent,
    data: { title: 'Linearicons Free' },
    canActivate: [AuthGuard],
  },
  {
    path: 'feather-icons',
    component: IconsFeatherComponent,
    data: { title: 'Feather Icons' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class IconsRouterModule {}
