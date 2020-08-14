import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { AdvancedRouterModule } from './advanced-routing.module'

// layout
import { AdvancedTypographyComponent } from 'src/app/pages/advanced/typography/typography.component'
import { AdvancedMailTemplatesComponent } from 'src/app/pages/advanced/mail-templates/mail-templates.component'
import { AdvancedUtilitiesComponent } from 'src/app/pages/advanced/utilities/utilities.component'
import { AdvancedGridComponent } from 'src/app/pages/advanced/grid/grid.component'
import { AdvancedFormExamplesComponent } from 'src/app/pages/advanced/form-examples/form-examples.component'
import { AdvancedInvoiceComponent } from 'src/app/pages/advanced/invoice/invoice.component'
import { AdvancedPricingTablesComponent } from 'src/app/pages/advanced/pricing-tables/pricing-tables.component'

const COMPONENTS = [
  AdvancedMailTemplatesComponent,
  AdvancedTypographyComponent,
  AdvancedUtilitiesComponent,
  AdvancedGridComponent,
  AdvancedFormExamplesComponent,
  AdvancedInvoiceComponent,
  AdvancedPricingTablesComponent,
]

@NgModule({
  imports: [SharedModule, AdvancedRouterModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
})
export class AdvancedModule {}
