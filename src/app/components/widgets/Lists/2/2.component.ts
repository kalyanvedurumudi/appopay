import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from '@app/services/api-provider';

@Component({
  selector: 'air-list-2',
  templateUrl: './2.component.html',
  styleUrls: ['./2.component.scss'],
})
export class AirList2Component implements OnInit {
  userdetails: any;
  notificationsCount: any;
  notifications: any;
  accountdetails: any;
  currentbalance: any;
  accountnumber: any;
  wallethistory: any[];
  count = 0;

  constructor(
    private apiProvider: ApiProvider,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.userdetails = this.storage.retrieve('userDetails');
    if (this.storage.retrieve('ROLE') != 'ADMIN') {
      this.getUserNotifications(this.userdetails.id);
    }

    this.accountdetails = this.storage.retrieve('account');
    if (!this.accountdetails) {
      this.accountdetails = this.userdetails.customerdetails.customeraccount[0];
    }
    if (this.accountdetails) {
      this.getWalletHistory();
    }
  }


  getUserNotifications(suserid) {
    const payload: any = {
      userid: suserid
    };

    this.apiProvider.post('wallet/notifications', payload).subscribe(
      async resdata => {
        this.notificationsCount = resdata.result.length;
        this.notifications = resdata.result;
        this.count += this.notifications.length;
        this.apiProvider.setNotificationCount(this.count);
      }, async (error) => {
      });
  }



  getWalletHistory() {

    const payload: any = {
      accountnumber: this.accountdetails.accountnumber
    };

    this.apiProvider.post('wallet/transactions', payload).subscribe(
      async resdata => {
        this.wallethistory = [];
        console.log(this.wallethistory);
        resdata.result.forEach((wallethistory: any) => {
          const historydata: any = {
            transactionid: wallethistory.transactionid,
            transactiondate: new Date(wallethistory.transactiondate),
            transactiondescription: wallethistory.transactiondescription,
            pendingbalance: wallethistory.pendingbalance,
            transactionamount: wallethistory.transactionamount,
            transactionstatus: wallethistory.transactionstatus,
            transactiontype: wallethistory.transactiontype
          };
          this.wallethistory.push(historydata);
        });
        this.count += this.wallethistory.length;
        this.apiProvider.setNotificationCount(this.count);
      }, async () => {
      });
  }
}
