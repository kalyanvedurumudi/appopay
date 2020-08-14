import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'
import { LayoutModule } from '../components/layout/layout.module'

import { LayoutAuthComponent } from './Auth/auth.component'
import { LayoutAppComponent } from './App/app.component'
import { LayoutPublicComponent } from './Public/public.component'

const COMPONENTS = [LayoutAuthComponent, LayoutAppComponent, LayoutPublicComponent]

@NgModule({
  imports: [SharedModule, LayoutModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule {}
