import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// cards
import { BasicCardsComponent } from 'src/app/pages/cards/basic-cards/basic-cards.component'
import { TabbedCardsComponent } from 'src/app/pages/cards/tabbed-cards/tabbed-cards.component'

const routes: Routes = [
  {
    path: 'basic-cards',
    component: BasicCardsComponent,
    data: { title: 'Basic Cards' },
    canActivate: [AuthGuard],
  },
  {
    path: 'tabbed-cards',
    component: TabbedCardsComponent,
    data: { title: 'Tabbed Cards' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class CardsRouterModule {}
