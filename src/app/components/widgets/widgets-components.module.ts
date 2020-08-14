import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { ChartistModule } from 'ng-chartist'
import { ChartModule } from 'angular2-chartjs'
import { UsMapModule } from 'angular-us-map'

import { AirGeneral1Component } from './General/1/1.component'
import { AirGeneral1v1Component } from './General/1v1/1v1.component'
import { AirGeneral2Component } from './General/2/2.component'
import { AirGeneral2v1Component } from './General/2v1/2v1.component'
import { AirGeneral2v2Component } from './General/2v2/2v2.component'
import { AirGeneral2v3Component } from './General/2v3/2v3.component'
import { AirGeneral2v4Component } from './General/2v4/2v4.component'
import { AirGeneral3Component } from './General/3/3.component'
import { AirGeneral3v1Component } from './General/3v1/3v1.component'
import { AirGeneral4Component } from './General/4/4.component'
import { AirGeneral5Component } from './General/5/5.component'
import { AirGeneral5v1Component } from './General/5v1/5v1.component'
import { AirGeneral6Component } from './General/6/6.component'
import { AirGeneral6v1Component } from './General/6v1/6v1.component'
import { AirGeneral7Component } from './General/7/7.component'
import { AirGeneral8Component } from './General/8/8.component'
import { AirGeneral9Component } from './General/9/9.component'
import { AirGeneral10Component } from './General/10/10.component'
import { AirGeneral10v1Component } from './General/10v1/10v1.component'
import { AirGeneral11Component } from './General/11/11.component'
import { AirGeneral11v1Component } from './General/11v1/11v1.component'
import { AirGeneral12Component } from './General/12/12.component'
import { AirGeneral12v1Component } from './General/12v1/12v1.component'
import { AirGeneral12v2Component } from './General/12v2/12v2.component'
import { AirGeneral12v3Component } from './General/12v3/12v3.component'
import { AirGeneral13Component } from './General/13/13.component'
import { AirGeneral13v1Component } from './General/13v1/13v1.component'
import { AirGeneral14Component } from './General/14/14.component'
import { AirGeneral15Component } from './General/15/15.component'
import { AirGeneral16Component } from './General/16/16.component'

import { AirList1Component } from './Lists/1/1.component'
import { AirList2Component } from './Lists/2/2.component'
import { AirList3Component } from './Lists/3/3.component'
import { AirList4Component } from './Lists/4/4.component'
import { AirList5Component } from './Lists/5/5.component'
import { AirList6Component } from './Lists/6/6.component'
import { AirList7Component } from './Lists/7/7.component'
import { AirList8Component } from './Lists/8/8.component'
import { AirList9Component } from './Lists/9/9.component'
import { AirList10Component } from './Lists/10/10.component'
import { AirList11Component } from './Lists/11/11.component'
import { AirList12Component } from './Lists/12/12.component'
import { AirList13Component } from './Lists/13/13.component'
import { AirList14Component } from './Lists/14/14.component'
import { AirList15Component } from './Lists/15/15.component'
import { AirList16Component } from './Lists/16/16.component'
import { AirList17Component } from './Lists/17/17.component'
import { AirList18Component } from './Lists/18/18.component'
import { AirList19Component } from './Lists/19/19.component'

import { AirChart1Component } from './Charts/1/1.component'
import { AirChart2Component } from './Charts/2/2.component'
import { AirChart3Component } from './Charts/3/3.component'
import { AirChart4Component } from './Charts/4/4.component'
import { AirChart4v1Component } from './Charts/4v1/4v1.component'
import { AirChart4v2Component } from './Charts/4v2/4v2.component'
import { AirChart4v3Component } from './Charts/4v3/4v3.component'
import { AirChart5Component } from './Charts/5/5.component'
import { AirChart6Component } from './Charts/6/6.component'
import { AirChart7Component } from './Charts/7/7.component'
import { AirChart8Component } from './Charts/8/8.component'
import { AirChart9Component } from './Charts/9/9.component'
import { AirChart10Component } from './Charts/10/10.component'

import { AirTable1Component } from './Tables/1/1.component'
import { AirTable2Component } from './Tables/2/2.component'
import { AirTable3Component } from './Tables/3/3.component'
import { AirTable4Component } from './Tables/4/4.component'
import { AirTable5Component } from './Tables/5/5.component'
import { AirTable6Component } from './Tables/6/6.component'
import { AirTable7Component } from './Tables/7/7.component'

const COMPONENTS = [
  AirGeneral1Component,
  AirGeneral1v1Component,
  AirGeneral2Component,
  AirGeneral2v1Component,
  AirGeneral2v2Component,
  AirGeneral2v3Component,
  AirGeneral2v4Component,
  AirGeneral3Component,
  AirGeneral3v1Component,
  AirGeneral4Component,
  AirGeneral5Component,
  AirGeneral5v1Component,
  AirGeneral6Component,
  AirGeneral6v1Component,
  AirGeneral7Component,
  AirGeneral8Component,
  AirGeneral9Component,
  AirGeneral10Component,
  AirGeneral10v1Component,
  AirGeneral11Component,
  AirGeneral11v1Component,
  AirGeneral12Component,
  AirGeneral12v1Component,
  AirGeneral12v2Component,
  AirGeneral12v3Component,
  AirGeneral13Component,
  AirGeneral13v1Component,
  AirGeneral14Component,
  AirGeneral15Component,
  AirGeneral16Component,
  AirList1Component,
  AirList2Component,
  AirList3Component,
  AirList4Component,
  AirList5Component,
  AirList6Component,
  AirList7Component,
  AirList8Component,
  AirList9Component,
  AirList10Component,
  AirList11Component,
  AirList12Component,
  AirList13Component,
  AirList14Component,
  AirList15Component,
  AirList16Component,
  AirList17Component,
  AirList18Component,
  AirList19Component,
  AirChart1Component,
  AirChart2Component,
  AirChart3Component,
  AirChart4Component,
  AirChart4v1Component,
  AirChart4v2Component,
  AirChart4v3Component,
  AirChart5Component,
  AirChart6Component,
  AirChart7Component,
  AirChart8Component,
  AirChart9Component,
  AirChart10Component,
  AirTable1Component,
  AirTable2Component,
  AirTable3Component,
  AirTable4Component,
  AirTable5Component,
  AirTable6Component,
  AirTable7Component,
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ChartistModule,
    ChartModule,
    CommonModule,
    UsMapModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class WidgetsComponentsModule {}
