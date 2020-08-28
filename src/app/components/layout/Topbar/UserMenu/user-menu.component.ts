import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'air-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 7;
  userName: string;
  billingPlan: string;
  email: string;
  phone: string;
  role: string;
  userDetails: any;

  constructor(public authService: AuthService,
    private storage: LocalStorageService) {
    this.userDetails = this.storage.retrieve('userDetails');

    this.userName = this.userDetails ? this.userDetails.firstName + ' ' + this.userDetails.lastName : 'Anonymous'
    this.billingPlan = 'Professional'
    this.email = this.userDetails ? this.userDetails.email : '';
    this.phone = this.userDetails ? this.userDetails.mobilenumber : '';
    this.role = this.userDetails ?this.userDetails.usertype : 'User';
  }

  logout() {
    this.authService.SignOut()
  }
}
