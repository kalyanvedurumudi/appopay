import { Component, OnInit, Injector } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from '@app/services/api-provider';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal: any;

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
  conversionRate = null;
  amounttoCredit = null;

  frcurrency = null;
  frcurrencyid = null;
  tcurrency = null;
  tcurrencyid = null;
  fromaccountno = null;

  constructor(
    private fb: FormBuilder,
    private apiProvider: ApiProvider,
    private storage: LocalStorageService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router
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
    this.spinner.show();
    this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + usertype).subscribe(
      async resdata => {
        this.userObj = resdata.result;
        this.getCurrency(resdata.result.customerdetails.customeraccount);
      }, async () => {
        this.spinner.hide();
      });
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
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });
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

  async getTransferedAmount() {
    const amounttocredit = (this.amounttoTransfer * this.conversionRate).toFixed(2);
    this.accountTransfersForm.controls.amountTranfered.setValue(amounttocredit);
    this.amounttoCredit = amounttocredit;
    this.spinner.hide();
  }

  async getConversionAmount() {
    this.accountTransfersForm.controls.amountTranfered.setValue(null);

    if (this.accountTransfersForm.value.fromAccount != null && this.accountTransfersForm.value.toCurrency != null) {

      const fromid = this.accountTransfersForm.value.fromAccount;
      let fromcurrencyid = 0;
      let fromcurrency = '';
      if (fromid != 0) {

        const filterdata = this.accounts.filter(function (accounts) {
          return accounts.id == fromid;
        });
        fromcurrencyid = filterdata[0].currencyid;
        this.frcurrencyid = fromcurrencyid;
        this.fromaccountno = filterdata[0].accountnumber;
        const filterdata1 = this.currencies.filter(function (currency) {
          return currency.id == fromcurrencyid;
        });
        fromcurrency = filterdata1[0].currency_code;
        this.frcurrency = fromcurrency;
      } else {
        fromcurrency = this.claimdetails.currencycode;
        const filterdata6 = this.currencies.filter(function (currency) {
          return currency.currency_code == fromcurrency;
        });
        this.frcurrency = fromcurrency;
        this.frcurrencyid = filterdata6[0].id;
        this.fromaccountno = 0;
      }

      this.tcurrencyid = this.accountTransfersForm.get('toCurrency').value;
      const tocurrencyid = this.accountTransfersForm.get('toCurrency').value;
      const filterdata4 = this.currencies.filter(function (currency) {
        return currency.id == tocurrencyid;
      });
      const tocurrency = filterdata4[0].currency_code;
      this.tcurrency = tocurrency;
      this.spinner.show();
      const url = 'https://api.exchangeratesapi.io/latest?base=' + fromcurrency;
      this.apiProvider.getConversionApi(url).subscribe(
        async bankdata => {
          const res = bankdata;
          this.conversionRate = res.rates[tocurrency];
          this.getTransferedAmount();
        }, async () => {
          this.spinner.hide();
        });

    }
  }

  transferAmount() {
    swal.fire({
      title: 'Enter Transaction Pin',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransactionpin = result.value;
        this.spinner.show();
        this.apiProvider.get('configurations/comissiontype/CLAIM-CONFIRM').subscribe(
          async comdata => {

            const bankcomission = comdata.result.bankcomission;
            const processingcomission = comdata.result.processingfees;
            const flatbankcomission = comdata.result.flatbankcomission;
            const flatprocessingcomission = comdata.result.flatprocessingfees;
            const fundamount = this.accountTransfersForm.get('amountTranfered').value;
            let bankfees = (bankcomission * fundamount).toFixed(2);
            const newamount = parseFloat(fundamount) - parseFloat(bankfees);
            let processingfees = (fundamount * processingcomission).toFixed(2);
            let finalamount = newamount - parseFloat(processingfees);
            bankfees = (parseFloat(bankfees) + flatbankcomission).toFixed(2);
            processingfees = (parseFloat(processingfees) + flatprocessingcomission).toFixed(2);
            const flatfees = (flatbankcomission + flatprocessingcomission).toFixed(2);
            finalamount = finalamount - parseFloat(flatfees);
            this.spinner.hide();

            const message = 'You are about to claim ' + finalamount + ' ' + this.tcurrency + ' . Please confirm ?  ';
            swal.fire({
              title: message,
              showCancelButton: true
            }).then((transConfirm) => {
              if (transConfirm) {
                const amountransferdata: any = {
                  mobilenumber: this.userObj.mobilenumber,
                  accountnumber: this.fromaccountno,
                  claimAmount: this.amounttoCredit,
                  currencyid: this.frcurrencyid,
                  conversionrate: this.conversionRate,
                  tocurrency: this.tcurrencyid,
                  transactionpin: datatransactionpin,
                  fromcurrencycode: this.frcurrency,
                  tocurrencycode: this.tcurrency,
                  sendername: this.userObj.firstName + ' ' + this.userObj.lastName,
                  originalAmount: finalamount,
                  userid: this.userObj.id,
                  recievername: this.userObj.firstName + ' ' + this.userObj.lastName,
                  charges: bankfees,
                  fees: processingfees,
                  areacode: this.userObj.phonecode,
                  claimCurrency: this.tcurrency,
                  transactionid: this.claimdetails.transactionid,
                  securityanswer: this.accountTransfersForm.get('yourName').value
                };
                this.spinner.show();
                this.apiProvider.post('wallet/claimconfirm', amountransferdata).subscribe(
                  async resdata => {
                    if (resdata.result == 'PINERROR') {
                      this.notification.warning('Warning', 'Invalid transaction pin.');


                    } else if (resdata.result == 'SECURITYERROR') {
                      this.notification.warning('Warning', 'Please enter a valid security answer.');

                    } else {
                      this.notification.success('Success', 'Your claim transfer is successful.');
                      this.router.navigate(['/dashboards/analytics']);
                    }
                    this.spinner.hide();
                  }, async () => {
                    this.notification.error('Failed', 'Failed to perform the claim ,Please try after sometime');
                    this.spinner.hide();
                  });
              }
            });
          }, async () => {
            this.notification.error('Failed', 'Failed to perform the claim ,Please try after sometime');
            this.spinner.hide();
          });
      } else {
        this.notification.warning('Warning', 'Please enter transaction pin.');
        this.spinner.hide();
      }
    });
  }
}
