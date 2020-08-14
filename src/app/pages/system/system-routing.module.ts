import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// system pages
import { LoginComponent } from 'src/app/pages/system/login/login.component'
import { RegisterComponent } from 'src/app/pages/system/register/register.component'
import { LockscreenComponent } from 'src/app/pages/system/lockscreen/lockscreen.component'
import { ForgotPasswordComponent } from 'src/app/pages/system/forgot-password/forgot-password.component'
import { Error500Component } from 'src/app/pages/system/500/500.component'
import { Error404Component } from 'src/app/pages/system/404/404.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Sign Up' },
  },
  {
    path: 'locksreen',
    component: LockscreenComponent,
    data: { title: 'Lockscreen' },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' },
  },
  {
    path: '404',
    component: Error404Component,
    data: { title: 'Error 404' },
  },
  {
    path: '500',
    component: Error500Component,
    data: { title: 'Error 500' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class SystemRouterModule {}
