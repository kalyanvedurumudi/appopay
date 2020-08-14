import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// UI Kits
import { UiKitAntdComponent } from 'src/app/pages/ui-kits/antd/antd.component'
import { UiKitBootstrapComponent } from 'src/app/pages/ui-kits/bootstrap/bootstrap.component'

const routes: Routes = [
  {
    path: 'antd',
    component: UiKitAntdComponent,
    data: { title: 'Antd UI Kit' },
    canActivate: [AuthGuard],
  },
  {
    path: 'bootstrap',
    component: UiKitBootstrapComponent,
    data: { title: 'Bootstrap UI Kit' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class UIKitsRouterModule {}
