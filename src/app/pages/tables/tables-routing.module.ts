import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// Tables
import { TablesAntdComponent } from 'src/app/pages/tables/antd/antd.component'
import { TablesBootstrapComponent } from 'src/app/pages/tables/bootstrap/bootstrap.component'

const routes: Routes = [
  {
    path: 'antd',
    component: TablesAntdComponent,
    data: { title: 'Antd Tables' },
    canActivate: [AuthGuard],
  },
  {
    path: 'bootstrap',
    component: TablesBootstrapComponent,
    data: { title: 'Bootstrap Tables' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class TablesRouterModule {}
