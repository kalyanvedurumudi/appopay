import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AirBootstrapAlertsExampleComponent } from './alerts/alerts.component'
import { AirBootstrapButtonsExampleComponent } from './buttons/buttons.component'
import { AirBootstrapCarouselExampleComponent } from './carousel/carousel.component'
import { AirBootstrapCollapseExampleComponent } from './collapse/collapse.component'
import { AirBootstrapDatepickerExampleComponent } from './datepicker/datepicker.component'
import { AirBootstrapDropdownsExampleComponent } from './dropdowns/dropdowns.component'
import { AirBootstrapModalsExampleComponent } from './modals/modals.component'
import { AirBootstrapPaginationExampleComponent } from './pagination/pagination.component'
import { AirBootstrapPopoverExampleComponent } from './popover/popover.component'
import { AirBootstrapProgressExampleComponent } from './progress/progress.component'
import { AirBootstrapRatingExampleComponent } from './rating/rating.component'
import { AirBootstrapTablesExampleComponent } from './tables/tables.component'
import { AirBootstrapTabsExampleComponent } from './tabs/tabs.component'
import { AirBootstrapTimepickerExampleComponent } from './timepicker/timepicker.component'
import { AirBootstrapToastsExampleComponent } from './toasts/toasts.component'
import { AirBootstrapTooltipsExampleComponent } from './tooltips/tooltips.component'
import { AirBootstrapTypeaheadExampleComponent } from './typeahead/typeahead.component'

const COMPONENTS = [
  AirBootstrapAlertsExampleComponent,
  AirBootstrapButtonsExampleComponent,
  AirBootstrapCarouselExampleComponent,
  AirBootstrapCollapseExampleComponent,
  AirBootstrapDatepickerExampleComponent,
  AirBootstrapDropdownsExampleComponent,
  AirBootstrapModalsExampleComponent,
  AirBootstrapPaginationExampleComponent,
  AirBootstrapPopoverExampleComponent,
  AirBootstrapProgressExampleComponent,
  AirBootstrapRatingExampleComponent,
  AirBootstrapTablesExampleComponent,
  AirBootstrapTabsExampleComponent,
  AirBootstrapTimepickerExampleComponent,
  AirBootstrapToastsExampleComponent,
  AirBootstrapTooltipsExampleComponent,
  AirBootstrapTypeaheadExampleComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, NgbModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class BootstrapUIKitExamplesModule {}
