import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { NgxSpinnerModule } from 'ngx-spinner';

const MODULES = [CommonModule, RouterModule, NgZorroAntdModule, TranslateModule, NgxSpinnerModule]

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}
