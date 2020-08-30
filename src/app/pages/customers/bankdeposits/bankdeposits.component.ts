import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiProvider } from '@app/services/api-provider';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd';
import { ConfirmationDialogComponent } from '@app/modal/confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var swal: any;

@Component({
  selector: 'app-bankdeposits',
  templateUrl: './bankdeposits.component.html',
  styleUrls: ['./bankdeposits.component.scss'],
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
export class BankDepositsComponent implements OnInit {
  selectCtrl: FormControl = new FormControl();
  inputType = 'password';
  visible = false;
  public onbankDepositForm: any;
  iscard = true;
  accounts: Array<any>;
  currencies: Array<any>;
  banknames: Array<any>;
  userObj: any;
  frcurrency = null;
  frcurrencyid = null;
  tcurrency = null;
  tcurrencyid = null;
  fromaccountno = null;
  toaccountno = null;
  transactionpin = null;
  loaderToShow: any;
  countries: Array<any>;
  bankcurrencies: Array<any>;
  bankName = null;
  bankcurrency = null;
  countryname = null;
  accounttypes: Array<any>;
  userDetails: any;
  routingNumber = null;
  amounttoCredit = null;
  conversionRate = null;

  constructor(
    private apiProvider: ApiProvider,
    private notification: NzNotificationService,
    private storage: LocalStorageService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.userDetails = this.storage.retrieve('userDetails');
  }

  ngOnInit() {
    this.onbankDepositForm = this.formBuilder.group({
      fromAccount: [null, Validators.compose([
        Validators.required
      ])],
      bank: [null, Validators.compose([
        Validators.required
      ])],
      bankCurrency: [null, Validators.compose([
        Validators.required
      ])],
      accountType: [null, Validators.compose([
        Validators.required
      ])],
      amounttoTransfer: [null, Validators.compose([
        Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]*$')
      ])],
      conversionRate: [null, Validators.compose([

      ])],
      amounttoCredit: [null, Validators.compose([
      ])],
      holderName: [null, Validators.compose([
        Validators.required
      ])],
      routingNumber: [null, Validators.compose([
      ])],
      accountNumber: [null, Validators.compose([
        Validators.required
      ])],
      depositDate: [null, Validators.compose([
        Validators.required
      ])],
      country: [null, Validators.compose([
        Validators.required
      ])],
    });
    this.onbankDepositForm.get('conversionRate').disable();
    this.onbankDepositForm.get('amounttoCredit').disable();
    this.onbankDepositForm.get('amounttoTransfer').disable();

    this.getCurrency();
    this.getCountry();
    this.getAccountTypes();
    this.latestUserDetails();
  }

  async getCountry() {
    this.spinner.show();
    this.apiProvider.getWithoutAuth('configurations/country').subscribe(
      async resdata => {
        this.countries = resdata.result;
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });

  }

  async getAccountTypes() {
    this.spinner.show();
    this.apiProvider.get('configurations/accounttypes').subscribe(
      async resdata => {
        this.accounttypes = resdata.result;
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });

  }

  async getBanksByCountry() {
    const countryid = this.onbankDepositForm.value.country;

    const filterdata3 = this.countries.filter(function (countries) {
      return countries.id == countryid;
    });
    if (filterdata3 && filterdata3.length > 0) {
      this.countryname = filterdata3[0].countryname;
      this.onbankDepositForm.controls.amounttoTransfer.setValue(null);
      this.onbankDepositForm.controls.amounttoCredit.setValue(null);
      this.spinner.show();
      this.apiProvider.get('configurations/banknames/' + countryid).subscribe(
        async resdata => {
          if (resdata.result && resdata.result.length > 0) {
            this.banknames = resdata.result;
          } else {
            this.notification.warning('Warning', 'No banks found for this country');
          }
          this.spinner.hide();
        }, async () => {
          this.spinner.hide();
        });
    } 
  }

  async getBanksCurrencybyBankid() {
    const bankid = this.onbankDepositForm.value.bank;
    this.onbankDepositForm.controls.amounttoTransfer.setValue(null);
    this.onbankDepositForm.controls.amounttoCredit.setValue(null);

    const filterdata3 = this.banknames.filter(function (banknames) {
      return banknames.id == bankid;
    });

    this.bankName = filterdata3[0].bankname;
    this.routingNumber = filterdata3[0].bankcode;

    this.onbankDepositForm.get('routingNumber').setValue(filterdata3[0].bankcode);
    this.onbankDepositForm.get('routingNumber').disable();
    this.spinner.show();
    this.apiProvider.get('configurations/bankcurrency/' + bankid).subscribe(
      async resdata => {
        this.bankcurrencies = resdata.result;
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });
  }

  latestUserDetails() {
    const mobileno = this.userDetails.mobilenumber;
    const areacode = this.userDetails.phonecode;
    const usertype = this.userDetails.usertype;
    this.spinner.show();
    this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + usertype).subscribe(
      async resdata => {
        this.accounts = resdata.result.customerdetails.customeraccount;
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
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

  getCurrencyName(cc) {
    const filterdata = this.currencies.filter(function (currency) {
      return currency.id == cc;
    });
    return filterdata[0].currency_code;
  }

  async getTransferedAmount() {
    const fromid = this.onbankDepositForm.value.fromAccount;
    const filterdata3 = this.accounts.filter(function (accounts) {
      return accounts.id == fromid;
    });

    if (filterdata3[0].currentbalance >= this.onbankDepositForm.value.amounttoTransfer) {

      const amounttocredit = (this.onbankDepositForm.value.amounttoTransfer
        * this.conversionRate).toFixed(2);
      this.onbankDepositForm.controls.amounttoCredit.setValue(amounttocredit);
      this.amounttoCredit = amounttocredit;
    } else {
      this.notification.warning('Warning', 'Your from account doesnt have enough balance to tranfer');
      this.onbankDepositForm.controls.amounttoTransfer.setValue(null);

    }
  }

  async getConversionAmount() {
    this.onbankDepositForm.controls.amounttoTransfer.setValue(null);
    this.onbankDepositForm.controls.amounttoCredit.setValue(null);
    if (this.onbankDepositForm.value.fromAccount != null && this.onbankDepositForm.value.bankCurrency != null) {
      this.onbankDepositForm.get('amounttoTransfer').enable();
      const fromid = this.onbankDepositForm.value.fromAccount;
      const filterdata = this.accounts.filter(function (accounts) {
        return accounts.id == fromid;
      });
      const fromcurrencyid = filterdata[0].currencyid;
      this.frcurrencyid = fromcurrencyid;
      this.fromaccountno = filterdata[0].accountnumber;

      const filterdata1 = this.currencies.filter(function (currency) {
        return currency.id == fromcurrencyid;
      });
      const fromcurrency = filterdata1[0].currency_code;
      this.frcurrency = fromcurrency;
      console.log("fromcurrency" + fromcurrency);

      const url = 'https://api.exchangeratesapi.io/latest?base=' + fromcurrency;

      const tocurrency = this.onbankDepositForm.value.bankCurrency;
      this.tcurrency = this.onbankDepositForm.value.bankCurrency;
      this.spinner.show();
      this.apiProvider.getConversionApi(url).subscribe(
        async bankdata => {
          const res = bankdata;
          console.log(res.rates[tocurrency]);
          this.onbankDepositForm.controls.conversionRate.setValue(res.rates[tocurrency]);
          this.conversionRate = res.rates[tocurrency];
          this.spinner.hide();
        }, async () => {
          this.spinner.hide();  
        });
    }
  }

  async transferAmount() {
    swal.fire({
      title: 'Enter  Transaction Pin',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransactionpin = result.value;
        this.spinner.show();
        this.apiProvider.get('configurations/comissiontype/BANK-DEPOSIT').subscribe(
          async comdata => {
            const bankcomission = comdata.result.bankcomission;
            const processingcomission = comdata.result.processingfees;
            const flatbankcomission = comdata.result.flatbankcomission;
            const flatprocessingcomission = comdata.result.flatprocessingfees;
            const fundamount = this.onbankDepositForm.value.amounttoTransfer;
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
            const dialogRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm' });
            dialogRef.componentInstance.message = 'You are about to transfer ' + finalamount + ' ' + this.frcurrency + ' from your wallet. Please confirm ?  ';
             dialogRef.result.then((result) => {
              if (result) { 
                const depdate = new Date(this.onbankDepositForm.value.depositDate);
                const newdate = depdate.toDateString();
                console.log(newdate);
                const amountransferdata: any = {
                  sendermobilenumber: this.userDetails.mobilenumber,
                  senderaccountnumber: this.fromaccountno,
                  amount: this.amounttoCredit,
                  fromcurrency: this.frcurrencyid,
                  conversionrate: this.conversionRate,
                  transactionpin: datatransactionpin,
                  fromcurrencycode: this.frcurrency,
                  tocurrencycode: this.tcurrency,
                  sendername: this.userDetails.firstName + ' ' + this.userDetails.lastName,
                  originalAmount: finalamount,
                  userid: this.userDetails.id,
                  charges: bankfees,
                  fees: processingfees,
                  senderareacode: this.userDetails.phonecode,
                  enteredAmount: this.onbankDepositForm.value.amounttoTransfer,
                  typeofAccount: 'SAVINGS',
                  holdername: this.onbankDepositForm.value.holderName,
                  routingnumber: this.routingNumber,
                  bankname: this.bankName,
                  countryname: this.countryname,
                  email: this.userDetails.email,
                  bankaccountnumber: this.onbankDepositForm.value.accountNumber,
                  depositdate: newdate,
                  deposittype: 'DEBIT',
                  taxes: taxes
                };
                this.spinner.show();
                this.apiProvider.post('cardidentifications/bankdeposit', amountransferdata).subscribe(
                  async resdata => {
                    this.spinner.hide();
                    if (resdata.result == -2) {
                      this.notification.warning('Warning', 'Invalid transaction pin');
                    } else if (resdata.result == -3) {
                      this.notification.warning('Warning', 'Your account dosent have sufficient fund');

                    } else if (resdata.result == -1) {
                      this.notification.error('Error', 'Failed to deposit amount ,Please try after sometime');
                    } else {
                      // this.events.publish('notifications', true);
                      this.notification.success('Success', 'Your bank deposit is successful,Amount will be deposited to your account with in 24 hr');
                      // this.notificationMessageService.setMessage(true);
                      this.onbankDepositForm.reset();
                    }
                  }, async (error) => {
                    this.spinner.hide();
                    this.notification.error('Error', 'Failed to deposit amount ,Please try after sometime');
                  });
              }
            });
          }, async () => {
            this.spinner.hide();
            this.notification.error('Error', 'Failed to transfer amount ,Please try after sometime.');
          });
      } else {
        this.spinner.hide();
        this.notification.warning('Warning', 'Please enter transaction pin');
      }
    });
  }
}
