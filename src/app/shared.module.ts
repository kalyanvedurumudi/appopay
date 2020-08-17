import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

const MODULES = [CommonModule, RouterModule, NgZorroAntdModule, TranslateModule]

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}
