import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

// Antd Tables components

import { ClaimrequestTableComponent } from './claimrequesttable/claimrequesttable.component'


const COMPONENTS = [
 
  ClaimrequestTableComponent,

]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ClaimrequestTableModule {}
