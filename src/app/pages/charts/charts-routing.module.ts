import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// charts
import { ChartsChartistComponent } from 'src/app/pages/charts/chartist/chartist.component'
import { ChartsChartComponent } from 'src/app/pages/charts/chart/chart.component'
import { ChartsC3Component } from 'src/app/pages/charts/c3/c3.component'

const routes: Routes = [
  {
    path: 'chartistjs',
    component: ChartsChartistComponent,
    data: { title: 'Chartist.js' },
    canActivate: [AuthGuard],
  },
  {
    path: 'chartjs',
    component: ChartsChartComponent,
    data: { title: 'Chart.js' },
    canActivate: [AuthGuard],
  },
  {
    path: 'c3',
    component: ChartsC3Component,
    data: { title: 'C3' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class ChartsRouterModule {}
