import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { DashboardAnalyticsComponent } from 'src/app/pages/dashboard/analytics/analytics.component'
import { DashboardEcommerceComponent } from 'src/app/pages/dashboard/ecommerce/ecommerce.component'
import { DashboardHelpdeskComponent } from 'src/app/pages/dashboard/helpdesk/helpdesk.component'
import { DashboardStatisticsComponent } from 'src/app/pages/dashboard/statistics/statistics.component'
import { DashboardJiraComponent } from 'src/app/pages/dashboard/jira/jira.component'
import { DashboardCryptoComponent } from 'src/app/pages/dashboard/crypto/crypto.component'
import { DashboardCryptoTerminalComponent } from './crypto-terminal/crypto-terminal.component'

const routes: Routes = [
  {
    path: 'analytics',
    component: DashboardAnalyticsComponent,
    data: { title: 'Dashboard Analytics' },
    canActivate: [AuthGuard],
  },
  {
    path: 'ecommerce',
    component: DashboardEcommerceComponent,
    data: { title: 'Dashboard Ecommerce' },
    canActivate: [AuthGuard],
  },
  {
    path: 'helpdesk',
    component: DashboardHelpdeskComponent,
    data: { title: 'Dashboard Helpdesk' },
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    component: DashboardStatisticsComponent,
    data: { title: 'Dashboard Statistics' },
    canActivate: [AuthGuard],
  },
  {
    path: 'jira',
    component: DashboardJiraComponent,
    data: { title: 'Dashboard Jira' },
    canActivate: [AuthGuard],
  },
  {
    path: 'crypto',
    component: DashboardCryptoComponent,
    data: { title: 'Dashboard Crypto' },
    canActivate: [AuthGuard],
  },
  {
    path: 'crypto-terminal',
    component: DashboardCryptoTerminalComponent,
    data: { title: 'Dashboard Crypto Terminal' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class DashboardRouterModule {}
