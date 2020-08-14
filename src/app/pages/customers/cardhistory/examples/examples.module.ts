import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

// Antd Tables components

import { CardhistoryTableComponent } from './cardhistorytable/cardhistorytable.component'


const COMPONENTS = [
 
  CardhistoryTableComponent,

]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class CardhistoryTableModule {}
