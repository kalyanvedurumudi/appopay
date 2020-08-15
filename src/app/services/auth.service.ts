import { Injectable } from '@angular/core'
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { LocalStorageService } from 'ngx-webstorage';

interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  emailVerified: boolean
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any

  constructor(
    // public afs: AngularFirestore,
    // public afAuth: AngularFireAuth,
    // public router: Router,
    // private notification: NzNotificationService
    private storage: LocalStorageService
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user
    //     localStorage.setItem('user', JSON.stringify(this.userData))
    //   } else {
    //     localStorage.setItem('user', null)
    //   }
    // })
  }

  async SignIn(email: string, password: string) {
    // try {
    //   await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //   this.router.navigate(['dashboard/analytics'])
    //   this.notification.success(
    //     'Logged In',
    //     'You have successfully logged in to AppoPay - Payments & Money Transfer Admin Template!',
    //   )
    // } catch (error) {
    //   this.notification.error(error.code, error.message)
    // }
  }

  get isLoggedIn(): boolean {
   const user = this.storage.retrieve('userDetails');
   return user !== null
  }

  async SignOut() {
  //   await this.afAuth.auth.signOut()
  //   localStorage.removeItem('user')
  //   this.router.navigate(['system/login'])
  }
}
