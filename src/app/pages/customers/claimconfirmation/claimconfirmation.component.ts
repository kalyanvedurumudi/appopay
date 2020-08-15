import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from '@app/services/api-provider';

@Component({
  selector: 'app-claimconfirmation',
  templateUrl: './claimconfirmation.component.html',
  styleUrls: ['./claimconfirmation.component.scss'],
  styles: [
    `
      nz-date-picker ::ng-deep .ant-calendar-picker {
        width: 100%;
      }

      nz-date-picker,
      nz-time-picker {
        width: 100%;
      }
    `,
  ],
})
export class ClaimconfirmationComponent implements OnInit {

  userObj: any;
  claimtype = null;
  claimdetails: any;
  accountTransfersForm: FormGroup;
  currencies: Array<any>;
  accounts: Array<any>;
  securityQuestion = null;
  amounttoTransfer = null;

  constructor(
    private fb: FormBuilder,
    private apiProvider: ApiProvider,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.userObj = this.storage.retrieve('userDetails');
    this.claimdetails = this.storage.retrieve('details');
    this.claimtype = this.storage.retrieve('claimtype');

    this.accountTransfersForm = this.fb.group({
      toCurrency: [null, Validators.compose([
        Validators.required
      ])],
      fromAccount: [null, Validators.compose([
        Validators.required
      ])],
      yourName: [null, Validators.compose([
        Validators.required
      ])],
      amountTranfered: [null, Validators.compose([
        Validators.required
      ])]
    });

    this.accountTransfersForm.get('amountTranfered').disable();
    this.latestUserDetails();
  }

  latestUserDetails() {
    const mobileno = this.userObj.mobilenumber;
    const areacode = this.userObj.phonecode;
    const usertype = this.userObj.usertype;

    this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + usertype).subscribe(
      async resdata => {
        this.userObj = resdata.result;
        this.getCurrency(resdata.result.customerdetails.customeraccount);
      }, async () => {});
  }

  async getCurrency(gaccounts) {
    this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
      async resdata => {
        if (this.claimtype == 'BASE') {
          this.currencies = resdata.result;
          const currencycode = this.claimdetails.currencycode;
          const filterdata = this.currencies.filter(function (currency) {
            return currency.currency_code == currencycode;
          });
          this.currencies = filterdata;
          const currencyid = this.currencies[0].id;
          const filterdata1 = gaccounts.filter(function (daccounts) {
            return daccounts.currencyid == currencyid;
          });
          this.accounts = [];
          this.accounts = filterdata1;
        } else {
          this.currencies = resdata.result;
          this.accountTransfersForm.controls.fromAccount.setValue(0);
        }
        this.accountTransfersForm.controls.amountTranfered.setValue(this.claimdetails.transferamount);
        this.accountTransfersForm.controls.amountTranfered.disable();
        this.securityQuestion = this.claimdetails.securityquestion;
        this.amounttoTransfer = this.claimdetails.transferamount;
      }, async () => {});
  }

  getCurrencyName(cc) {
    const filterdata = this.currencies.filter(function (currency) {
      return currency.id == cc;
    });
    return filterdata[0].currency_code;
  }

  submitForm(value: { email: string; }): void {
    for (const key in this.accountTransfersForm.controls) {
      this.accountTransfersForm.controls[key].markAsDirty();
      this.accountTransfersForm.controls[key].updateValueAndValidity();
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.accountTransfersForm.reset();
    for (const key in this.accountTransfersForm.controls) {
      this.accountTransfersForm.controls[key].markAsPristine();
      this.accountTransfersForm.controls[key].updateValueAndValidity();
    }
  }
}
