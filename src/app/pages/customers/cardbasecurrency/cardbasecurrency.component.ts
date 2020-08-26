import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from '@app/services/api-provider';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal: any;

@Component({
  selector: 'app-cardbasecurrency',
  templateUrl: './cardbasecurrency.component.html',
  styleUrls: ['./cardbasecurrency.component.scss'],
  styles: [':host ::ng-deep .ql-container {height: 200px;}'],
})
export class CardbaseCurrencyComponent implements OnInit {

  onCardbasecurrencyForm: FormGroup;
  accounts: Array<any>;
  userDetails: any;
  currencies: Array<any>;
  isChangeCurrency = null;
  currencycode = null;
  isBankDetails = false;
  toaccounts: Array<any>;
  bankaccounts: Array<any>;

  submitted = false;
  cardslist: Array<any>;
  cardtype = null;


  constructor(
    private formBuilder: FormBuilder,
    private apiProvider: ApiProvider,
    private storage: LocalStorageService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.userDetails = this.storage.retrieve('userDetails');
  }

  ngOnInit() {
    this.onCardbasecurrencyForm = this.formBuilder.group({
      fundAmount: [null, Validators.compose([
        Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')
      ])],
      cardFullName: [null, Validators.compose([
        Validators.required, Validators.maxLength(30)
      ])],
      fromAccount: [null, Validators.compose([
        Validators.required
      ])],
      currency: [null, Validators.compose([
        Validators.required
      ])],
      conversionRate: [null, Validators.compose([
        Validators.required
      ])],
      amounttoCredit: [null, Validators.compose([
        Validators.required
      ])],
      cardNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(6), Validators.maxLength(21), Validators.pattern('^[0-9]*$')
      ])],
      expirationMonth: [null, Validators.compose([
        Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')
      ])],
      cardCvv: [null, Validators.compose([
        Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')
      ])]
    });
    this.latestUserDetails();
    this.getCurrency();
  }

  resetform() {
    this.onCardbasecurrencyForm.reset();
  }

  get fval() {
    return this.onCardbasecurrencyForm.controls;
  }

  async getConversionAmount() {
    this.onCardbasecurrencyForm.controls.fundAmount.setValue(null);
    this.onCardbasecurrencyForm.controls.amounttoCredit.setValue(null);
    if (this.onCardbasecurrencyForm.value.fromAccount != null
      && this.onCardbasecurrencyForm.value.currency != null) {

      const fromid = this.onCardbasecurrencyForm.value.fromAccount;
      const filterdata = this.accounts.filter(function (accounts) {
        return accounts.id == fromid;
      });
      const fromcurrencyid = filterdata[0].currencyid;
      const currencycode = this.onCardbasecurrencyForm.value.currency;

      const filterdata2 = this.currencies.filter(function (currency) {
        return currency.id == fromcurrencyid;
      });
      const fromcurrencycode = filterdata2[0].currency_code;

      const url = 'https://api.exchangeratesapi.io/latest?base=' + fromcurrencycode;
      this.spinner.show();
      this.apiProvider.getConversionApi(url).subscribe(
        async bankdata => {
          const res = bankdata;
          const conversionrate = res.rates[currencycode].toFixed(2);
          this.onCardbasecurrencyForm.controls.conversionRate.setValue(conversionrate);
          this.spinner.hide();
        }, async () => {
          this.spinner.hide();
        });
    }
  }

  async getTransferedAmount() {
    const amounttocredit = (this.onCardbasecurrencyForm.value.fundAmount
      * this.onCardbasecurrencyForm.value.conversionRate).toFixed(2);
    this.onCardbasecurrencyForm.controls.amounttoCredit.setValue(amounttocredit);
  }


  async latestUserDetails() {
    const mobileno = this.userDetails.mobilenumber;
    const areacode = this.userDetails.phonecode;
    const usertype = this.userDetails.usertype;
    this.spinner.show();

    this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + usertype).subscribe(
      async resdata => {
        this.userDetails = resdata.result;
        this.accounts = resdata.result.customerdetails.customeraccount;
        this.toaccounts = resdata.result.customerdetails.customeraccount;
        this.usercardetails();
        this.spinner.hide();        
      }, async () => {
        this.spinner.hide();
      });
  }

  usercardetails() {
    this.spinner.show();
    this.apiProvider.get('users/getcards/' + this.userDetails.id).subscribe(
      async resdata => {
        this.cardslist = resdata.result;
        this.getallcards();
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });

  }

  getallcards() {
    this.cardslist.forEach((usercardmapping: any) => {
      if (usercardmapping.isdefault == true) {
        const transactiontoken = usercardmapping.transactionid;
        const fetchdata = {
          transctionid: transactiontoken,
        };
        this.cardtype = usercardmapping.cardtype;
        this.spinner.show();
        this.apiProvider.postNodeUrl('customerbyTransactionID', fetchdata).subscribe(
          async resdata => {
            if (resdata && resdata.billing) {
              const ccexp = resdata.billing['cc-exp'];
              this.onCardbasecurrencyForm.controls.cardNumber.setValue(resdata.billing['cc-number']);
              this.onCardbasecurrencyForm.controls.expirationMonth.setValue(ccexp);
            }
          this.spinner.hide();
          }, async () => {
            this.spinner.hide();
          });
      }
    });
  }

  async getCurrency() {
    this.spinner.show();
    this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
      async resdata => {
        this.currencies = resdata.result;
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });

  }
  getCurrencyName(cc): string {
    if (this.currencies && this.currencies.length > 0) {
      const filterdata = this.currencies.filter(function (currency) {
        return currency.id == cc;
      });
      return filterdata[0].currency_code;
    }
    return '';
  }

  addFund() {
    const accountid = this.onCardbasecurrencyForm.value.fromAccount;
    const filterdata3 = this.accounts.filter(function (accounts) {
      return accounts.id == accountid;
    });
    const currencyid = filterdata3[0].currencyid;
    const toaccountno = filterdata3[0].accountnumber;

    const filterdata1 = this.currencies.filter(function (currency) {
      return currency.id == currencyid;
    });

    const currencycode = filterdata1[0].currency_code;

    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    const cooptavanzaRegEx = /^(?:60891700[0-9]{11})$/;
    let cardtype = '';
    let isvalid = true;
    if (visaRegEx.test(this.onCardbasecurrencyForm.value.cardNumber)) {
      cardtype = 'VISA';
    } else if (mastercardRegEx.test(this.onCardbasecurrencyForm.value.cardNumber)) {
      cardtype = 'MASTER';
    } else if (amexpRegEx.test(this.onCardbasecurrencyForm.value.cardNumber)) {
      cardtype = 'AMEX';
    } else if (discovRegEx.test(this.onCardbasecurrencyForm.value.cardNumber)) {
      cardtype = 'DISCOVER';
    } else if (cooptavanzaRegEx.test(this.onCardbasecurrencyForm.value.cardNumber)) {
      cardtype = 'COOPTAVANZA';
    } else {
      isvalid = false;
      this.notification.warning('Warning','Please enter a valid card');
    }

    swal.fire({
      title: 'Transaction Pin',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransaction = result.value;
        const ccexp = this.onCardbasecurrencyForm.value.expirationMonth;
        let cardnumber = 0;
        let ccExp = 0;
        let cardcvv = 0;
        // tslint:disable-next-line:radix
        cardnumber = parseInt(this.onCardbasecurrencyForm.value.cardNumber);
        // tslint:disable-next-line:radix
        ccExp = ccexp;
        // tslint:disable-next-line:radix
        cardcvv = parseInt(this.onCardbasecurrencyForm.value.cardCvv);
        this.spinner.show();
        this.apiProvider.get('configurations/comissiontype/CARD-WALLET').subscribe(
          async comdata => {

            const bankcomission = comdata.result.bankcomission;
            const processingcomission = comdata.result.processingfees;
            const flatbankcomission = comdata.result.flatbankcomission;
            const flatprocessingcomission = comdata.result.flatprocessingfees;
            const fundamount = this.onCardbasecurrencyForm.value.fundAmount;
            let bankfees = (bankcomission * fundamount).toFixed(2);
            const newamount = parseFloat(fundamount) + parseFloat(bankfees);
            let processingfees = (fundamount * processingcomission).toFixed(2);
            let finalamount = newamount + parseFloat(processingfees);
            bankfees = (parseFloat(bankfees) + flatbankcomission).toFixed(2);
            processingfees = (parseFloat(processingfees) + flatprocessingcomission).toFixed(2);
            const flatfees = (flatbankcomission + flatprocessingcomission).toFixed(2);
            finalamount = finalamount + parseFloat(flatfees);

            const taxpercentage = comdata.result.taxpercentage;
            let taxes = 0;
            if (comdata.result.taxon == 'FEES') {
              //apply tax on fees
              taxes = flatfees * taxpercentage / 100
            } else {
              taxes = finalamount * taxpercentage / 100
            }
            finalamount = finalamount + taxes;
            this.spinner.hide();

            // tslint:disable-next-line:max-line-length
            const message = 'You are about debit your card with ' + finalamount + ' ' + currencycode + ' to fund your wallet . Please confirm ?  ';
            swal.fire({
              title: message,
              showCancelButton: true
            }).then((transConfirm) => {
              if (transConfirm.isConfirmed) {
                const amountransferdata: any = {
                  ccnumber: cardnumber,
                  ccexp: ccExp,
                  cvv: cardcvv,
                  fullName: this.onCardbasecurrencyForm.value.cardFullName,
                  amount: finalamount,
                  accountnumber: toaccountno,
                  mobilenumber: this.userDetails.mobilenumber,
                  transactionpin: datatransaction,
                  // tslint:disable-next-line:object-literal-shorthand
                  currencycode: currencycode,
                  // tslint:disable-next-line:object-literal-shorthand
                  currencyid: currencyid,
                  userid: this.userDetails.id,
                  senddername: this.userDetails.firstName + ' ' + this.userDetails.lastName,
                  charges: bankfees,
                  fees: processingfees,
                  areacode: this.userDetails.phonecode,
                  fundamount: this.onCardbasecurrencyForm.value.amounttoCredit,
                  cardtpe: cardtype,
                  taxes: taxes
                };
                this.spinner.show();
                this.apiProvider.post('wallet/addfund', amountransferdata).subscribe(
                  async resdata => {
                    if (resdata.result == -1) {
                      this.notification.warning('Warning', 'Invalid transaction pin');

                    } else if (resdata.result == 0) {
                      this.notification.warning('Warning', 'Failed to add fund from your card.Please try after sometime');

                    } else {
                      this.notification.success('Success', 'Amount has been added successfully to your wallet');
                      // this.events.publish('notifications', true);
                      // this.navCtrl.navigateRoot('/account-information');
                      // this.notificationMessageService.setMessage(true);
                      this.onCardbasecurrencyForm.reset();
                      this.router.navigate(['/dashboards/analytics']);

                    }
                    this.spinner.hide();
                  }, async () => {
                    this.notification.error('Error', 'Failed to add fund from your card.Please try after sometime');
                    this.spinner.hide();
                  });
              }
            });
          }, async () => {
            this.notification.error('Error', 'Failed to add fund from your card.Please try after sometime');
            this.spinner.hide();
          });
      } else {
        this.notification.warning('Warning', 'Please enter transaction pin');
        this.spinner.hide();
      }
    });

  }
}
