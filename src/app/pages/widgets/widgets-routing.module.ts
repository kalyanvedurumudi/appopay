import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// widgets
import { ChartsWidgetsComponent } from 'src/app/pages/widgets/charts/charts.component'
import { GeneralWidgetsComponent } from 'src/app/pages/widgets/general/general.component'
import { ListsWidgetsComponent } from 'src/app/pages/widgets/lists/lists.component'
import { TablesWidgetsComponent } from 'src/app/pages/widgets/tables/tables.component'

const routes: Routes = [
  {
    path: 'charts',
    component: ChartsWidgetsComponent,
    data: { title: 'Charts Widgets' },
    canActivate: [AuthGuard],
  },
  {
    path: 'general',
    component: GeneralWidgetsComponent,
    data: { title: 'General Widgets' },
    canActivate: [AuthGuard],
  },
  {
    path: 'lists',
    component: ListsWidgetsComponent,
    data: { title: 'Lists Widgets' },
    canActivate: [AuthGuard],
  },
  {
    path: 'tables',
    component: TablesWidgetsComponent,
    data: { title: 'Tables Widgets' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class WidgetsRouterModule {}
