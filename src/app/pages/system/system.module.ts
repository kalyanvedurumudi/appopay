import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { SystemRouterModule } from './system-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// system pages
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { LockscreenComponent } from './lockscreen/lockscreen.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { Error500Component } from './500/500.component'
import { Error404Component } from './404/404.component'

const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
  LockscreenComponent,
  ForgotPasswordComponent,
  Error500Component,
  Error404Component,
]

@NgModule({
  imports: [SharedModule, SystemRouterModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
})
export class SystemModule {}
