import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// layout
import { AdvancedTypographyComponent } from 'src/app/pages/advanced/typography/typography.component'
import { AdvancedMailTemplatesComponent } from 'src/app/pages/advanced/mail-templates/mail-templates.component'
import { AdvancedUtilitiesComponent } from 'src/app/pages/advanced/utilities/utilities.component'
import { AdvancedGridComponent } from 'src/app/pages/advanced/grid/grid.component'
import { AdvancedFormExamplesComponent } from 'src/app/pages/advanced/form-examples/form-examples.component'
import { AdvancedInvoiceComponent } from 'src/app/pages/advanced/invoice/invoice.component'
import { AdvancedPricingTablesComponent } from 'src/app/pages/advanced/pricing-tables/pricing-tables.component'

const routes: Routes = [
  {
    path: 'email-templates',
    component: AdvancedMailTemplatesComponent,
    data: { title: 'Mail Templates' },
    canActivate: [AuthGuard],
  },
  {
    path: 'typography',
    component: AdvancedTypographyComponent,
    data: { title: 'Typography' },
    canActivate: [AuthGuard],
  },
  {
    path: 'utilities',
    component: AdvancedUtilitiesComponent,
    data: { title: 'Utilities' },
    canActivate: [AuthGuard],
  },
  {
    path: 'grid',
    component: AdvancedGridComponent,
    data: { title: 'Grid' },
    canActivate: [AuthGuard],
  },
  {
    path: 'form-examples',
    component: AdvancedFormExamplesComponent,
    data: { title: 'Form Examples' },
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice',
    component: AdvancedInvoiceComponent,
    data: { title: 'Invoice' },
    canActivate: [AuthGuard],
  },
  {
    path: 'pricing-tables',
    component: AdvancedPricingTablesComponent,
    data: { title: 'Pricing Tables' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AdvancedRouterModule {}
