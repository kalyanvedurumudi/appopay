import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

// Antd Tables components
import { AirAntdTableBasicComponent } from './basic/basic.component'
import { AirAntdTableRowSelectionComponent } from './row-selection/row-selection.component'
import { AirAntdTableFilterComponent } from './filter/filter.component'
import { AirAntdTableResetFilterComponent } from './reset-filter/reset-filter.component'
import { AirAntdTableCustomFilterComponent } from './custom-filter/custom-filter.component'
import { AirAntdTableSizeComponent } from './size/size.component'
import { AirAntdTableBorderComponent } from './border/border.component'
import { AirAntdTableExpandedComponent } from './expanded/expanded.component'
import { AirAntdTableSpanComponent } from './span/span.component'
import { AirAntdTableTreeComponent } from './tree/tree.component'
import { AirAntdTableFixedHeaderComponent } from './fixed-header/fixed-header.component'
import { AirAntdTableFixedColumnsComponent } from './fixed-columns/fixed-columns.component'
import { AirAntdTableFixedAllComponent } from './fixed-all/fixed-all.component'
import { AirAntdTableGroupingComponent } from './grouping/grouping.component'
import { AirAntdTableEditableCellsComponent } from './editable-cells/editable-cells.component'
import { AirAntdTableEditableRowsComponent } from './editable-rows/editable-rows.component'
import { AirAntdTableDynamicComponent } from './dynamic/dynamic.component'

const COMPONENTS = [
  AirAntdTableBasicComponent,
  AirAntdTableRowSelectionComponent,
  AirAntdTableFilterComponent,
  AirAntdTableResetFilterComponent,
  AirAntdTableCustomFilterComponent,
  AirAntdTableSizeComponent,
  AirAntdTableBorderComponent,
  AirAntdTableExpandedComponent,
  AirAntdTableSpanComponent,
  AirAntdTableTreeComponent,
  AirAntdTableFixedHeaderComponent,
  AirAntdTableFixedColumnsComponent,
  AirAntdTableFixedAllComponent,
  AirAntdTableGroupingComponent,
  AirAntdTableEditableCellsComponent,
  AirAntdTableEditableRowsComponent,
  AirAntdTableDynamicComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AntdTablesExaplesModule {}
