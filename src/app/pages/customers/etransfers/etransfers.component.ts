import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '@app/services/api-provider';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '@app/modal/confirmation-dialog.component';
declare var swal: any;

@Component({
  selector: 'app-etransfers',
  templateUrl: './etransfers.component.html',
  styleUrls: ['./etransfers.component.scss'],
  styles: [':host ::ng-deep .ql-container {height: 200px;}'],
})
export class EtransfersComponent implements OnInit {

  smsForm: any;
  passwordInputType = 'password';
  currencies: Array<any>;
  accounts: Array<any>;
  countries: Array<any>;
  frcurrency = null;
  frcurrencyid = null;
  tcurrency = null;
  tcurrencyid = null;
  fromaccountno = null;
  toaccountno = null;
  conversionRate = null;
  amounttoCredit = null;
  userDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private modalService: NgbModal,
    private apiProvider: ApiProvider,
    private spinner: NgxSpinnerService,
    private storage: LocalStorageService) {
    this.userDetails = this.storage.retrieve('userDetails');
  }

  ngOnInit() {
    this.smsForm = this.formBuilder.group({
      fromAccount: [null, Validators.compose([
        Validators.required
      ])],
      currency: [null, Validators.compose([
        Validators.required
      ])],
      selectCode: [null, Validators.compose([
        Validators.required
      ])],
      mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')
      ])],
      securityQuestion: [null, Validators.compose([
        Validators.required
      ])],
      securityAnswer: [null, Validators.compose([
        Validators.required
      ])],
      firstName: [null, Validators.compose([
        Validators.required
      ])],
      lastName: [null, Validators.compose([
        Validators.required
      ])],
      amounttoTransfer: [null, Validators.compose([
        Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]*$')
      ])],
      conversionRate: [null, Validators.compose([
        Validators.required
      ])],
      amounttoCredit: [null, Validators.compose([
        Validators.required
      ])],
    });
    this.smsForm.get('conversionRate').disable();
    this.smsForm.get('amounttoCredit').disable();
    this.getCountry();
    this.getCurrency();
    this.latestUserDetails();
  }

  resetForm() {
    this.smsForm.reset();
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
    if (this.currencies && this.currencies.length > 0) {
      const filterdata = this.currencies.filter(function (currency) {
        return currency.id == cc;
      });
      return filterdata[0].currency_code;
    }
    return '';
  }

  async getTransferedAmount() {
    const fromid = this.smsForm.value.fromAccount;
    const filterdata3 = this.accounts.filter(function (accounts) {
      return accounts.id == fromid;
    });

    if (filterdata3[0].currentbalance >= this.smsForm.value.amounttoTransfer) {

      const amounttocredit = (this.smsForm.value.amounttoTransfer * this.conversionRate).toFixed(2);
      this.smsForm.controls.amounttoCredit.setValue(amounttocredit);
      this.amounttoCredit = amounttocredit;
    } else {
      this.notification.warning('Warning', 'Your from account doesnt have enough balance to tranfer');
      this.smsForm.controls.amounttoTransfer.setValue(null);

    }
  }

  async getConversionAmount() {
    this.smsForm.controls.amounttoTransfer.setValue(null);
    this.smsForm.controls.amounttoCredit.setValue(null);
    if (this.smsForm.value.fromAccount != null && this.smsForm.value.currency != null) {

      const fromid = this.smsForm.value.fromAccount;
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

      this.tcurrencyid = this.smsForm.value.currency;
      const tocurrencyid = this.smsForm.value.currency;
      const filterdata4 = this.currencies.filter(function (currency) {
        return currency.currency_code == tocurrencyid;
      });
      const tocurrency = filterdata4[0].currency_code;
      this.tcurrency = tocurrency;
      const url = 'https://api.exchangeratesapi.io/latest?base=' + fromcurrency;
      this.spinner.show();
      this.apiProvider.getConversionApi(url).subscribe(
        async bankdata => {
          const res = bankdata;
          console.log(res.rates[tocurrency]);
          this.smsForm.controls.conversionRate.setValue(res.rates[tocurrency]);
          this.conversionRate = res.rates[tocurrency];
          this.spinner.hide();
        }, async () => {
          this.spinner.hide();
        });

    }
  }

  async transferAmount() {
    const mobileno = this.smsForm.value.mobileNumber;
    const areacode = this.smsForm.value.selectCode;
    this.spinner.show();
    this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/CUSTOMER').subscribe(
      async resdata => {
        if (resdata.result == null) {
          const dialogRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm' });
          dialogRef.componentInstance.message = 'Reciever information doesnt exists.Do you still wish to continue and make payment ?';
          dialogRef.result.then((result) => {
            if (result) {
              this.makePayment();
            }
          });
        } else {
          this.makePayment();
        }
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });

  }

  async  makePayment() {
    swal.fire({
      title: 'Enter 6 Digit Transaction Pin',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransactionpin = result.value;
        this.spinner.show();
        this.apiProvider.get('configurations/comissiontype/SMS-TRANSFER').subscribe(
          async comdata => {
            const bankcomission = comdata.result.bankcomission;
            const processingcomission = comdata.result.processingfees;
            const flatbankcomission = comdata.result.flatbankcomission;
            const flatprocessingcomission = comdata.result.flatprocessingfees;
            const fundamount = this.smsForm.get('amounttoTransfer').value;
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
            dialogRef.componentInstance.message = 'You are about to transfer ' + finalamount + ' ' + this.frcurrency + ' . Please confirm ?  ';
            dialogRef.result.then((result) => {
              if (result) {
                // tslint:disable-next-line:radix
                //const arecode = parseInt(this.smsForm.selectCode);
                // tslint:disable-next-line:radix
                //const mobno = parseInt(this.recieverinformation.mobileno);
                const amountransferdata: any = {
                  sendermobilenumber: this.userDetails.mobilenumber,
                  senderaccountnumber: this.fromaccountno,
                  transferamount: parseFloat(this.amounttoCredit),
                  fromcurrency: this.frcurrencyid,
                  conversionrate: this.conversionRate,
                  tocurrency: this.tcurrencyid,
                  transactionpin: datatransactionpin,
                  fromcurrencycode: this.frcurrency,
                  currencycode: this.tcurrency,
                  sendername: this.userDetails.firstName + ' ' + this.userDetails.lastName,
                  originalAmount: finalamount,
                  userid: this.userDetails.id,
                  recievername: this.smsForm.value.firstName + ' ' + this.smsForm.value.lastName,
                  charges: bankfees,
                  fees: processingfees,
                  senderareacode: this.userDetails.phonecode,
                  mobilenumber: this.smsForm.value.mobileNumber,
                  areacode: this.smsForm.value.selectCode,
                  securityquestion: this.smsForm.value.securityQuestion,
                  securityanswer: this.smsForm.value.securityAnswer,
                  enteredAmount: this.smsForm.value.amounttoTransfer,
                  firstname: this.smsForm.value.firstName,
                  lastname: this.smsForm.value.lastName,
                  taxes: taxes
                };
                this.spinner.show();
                this.apiProvider.post('wallet/sendsmstransfer', amountransferdata).subscribe(
                  async resdata => {
                    if (resdata.result == -1 || resdata.result === 'PINERROR') {
                      this.notification.warning('Warning', 'Invalid transaction pin');
                    } else if (resdata.result == -2) {
                      this.notification.warning('Warning', 'Your account dosent have sufficient fund');
                    } else {
                      //this.events.publish('notifications', true);
                      this.notification.success('Success', 'Your sms transfer is successful, Account will be deibited once the reciever accepts amount ');
                      // this.notificationMessageService.setMessage(true);
                      this.smsForm.reset();
                    }
                    this.spinner.hide();
                  }, async () => {
                    this.notification.error('Error', 'Failed to transfer amount ,Please try after sometime.');
                    this.spinner.hide();
                  });
              }
            });
          }, async () => {
            this.notification.error('Error', 'Failed to transfer amount ,Please try after sometime.');
            this.spinner.hide();
          });
      } else {
        this.notification.warning('Warning', 'Please enter transaction pin');
        this.spinner.hide();
      }
    });
  }
}
