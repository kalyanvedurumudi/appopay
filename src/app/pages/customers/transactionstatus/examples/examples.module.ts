import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

// Antd Tables components

import { TransactionstatusTableComponent } from './transactionstatustable/transactionstatustable.component'


const COMPONENTS = [
 
  TransactionstatusTableComponent,

]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class TransactionstatusTableModule {}
