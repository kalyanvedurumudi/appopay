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
  selector: 'app-intraaccounttransfers',
  templateUrl: './intraaccounttransfers.component.html',
  styleUrls: ['./intraaccounttransfers.component.scss'],
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
export class IntraaccountTransfersComponent implements OnInit {
  onChangeMobileForm: any;
  ontransferForm: any;
  currencies: Array<any>;
  userDetails: any;
  accounts: Array<any>;
  countries: Array<any>;
  showtransfer = false;
  recieverUserObj: any;
  firstName = null;
  lastName = null;
  recieveraccounts: Array<any>;
  frcurrency = null;
  frcurrencyid = null;
  tcurrency = null;
  tcurrencyid = null;
  fromaccountno = null;
  toaccountno = null;
  transactionpin = null;
  senderdetails: any;
  conversionRate = null;
  amounttoCredit = null;

  constructor(
    private apiProvider: ApiProvider,
    private storage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private notification: NzNotificationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
      this.userDetails = this.storage.retrieve('userDetails');
    }

  ngOnInit() {
    this.getCurrency();
    this.getCountry();
    this.onChangeMobileForm = this.formBuilder.group({
      selectCode: [null, Validators.compose([
        Validators.required
      ])],
      mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')
      ])]
    });


    this.ontransferForm = this.formBuilder.group({
      fromAccount: [null, Validators.compose([
        Validators.required
      ])],
      toAccount: [null, Validators.compose([
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

    this.ontransferForm.get('conversionRate').disable();
    this.ontransferForm.get('amounttoCredit').disable();

    this.latestUserDetails();
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

  resetForm(e: MouseEvent): void {
    this.onChangeMobileForm.reset();
    this.ontransferForm.reset();
    this.showtransfer = false;
  }

  async searchbyMobile() {
    const mobileno = this.onChangeMobileForm.value.mobileNumber;
    const usermobile = this.userDetails.phonecode + this.userDetails.mobilenumber;
    const enteredmobile = this.onChangeMobileForm.value.selectCode
      + this.onChangeMobileForm.value.mobileNumber;
    if (usermobile == enteredmobile) {
      this.notification.warning('Warning', 'You cannot search your own registered mobile number');

    } else {
      const areacode = this.onChangeMobileForm.value.selectCode;
      this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/CUSTOMER').subscribe(
        async resdata => {
          console.log(resdata)
          this.recieverUserObj = resdata.result;
          this.firstName = this.recieverUserObj.firstName;
          this.lastName = this.recieverUserObj.lastName;
          this.recieveraccounts = [];
          this.recieveraccounts = resdata.result.customerdetails.customeraccount;
          if (this.recieveraccounts.length > 0) {
            this.showtransfer = true;
          } else {
            this.showtransfer = false;
          }


        }, async (error) => {
          this.notification.warning('Warning', 'Some thing went wrong please try again');

        });
    }

  }

  async getTransferedAmount() {
    const fromid = this.ontransferForm.value.fromAccount;
    const filterdata3 = this.accounts.filter(function (accounts) {
      return accounts.id == fromid;
    });

    if (filterdata3[0].currentbalance >= this.ontransferForm.value.amounttoTransfer) {

      const amounttocredit =
        (this.ontransferForm.value.amounttoTransfer * this.conversionRate).toFixed(2);
      this.ontransferForm.controls.amounttoCredit.setValue(amounttocredit);
      this.amounttoCredit = amounttocredit;
    } else {
      this.notification.warning('Warning', 'Your from account doesnt have enough balance to tranfer');
      this.ontransferForm.controls.amounttoTransfer.setValue(null);

    }
  }

  async getConversionAmount() {
    if (this.ontransferForm.value.fromAccount != null && this.ontransferForm.value.toAccount != null) {

      const fromid = this.ontransferForm.value.fromAccount;
      const toid = this.ontransferForm.value.toAccount;
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

      const filterTOdata = this.recieveraccounts.filter(function (recieveraccounts) {
        return recieveraccounts.id == toid;
      });

      const tocurrencyid = filterTOdata[0].currencyid;
      this.tcurrencyid = tocurrencyid;
      this.toaccountno = filterTOdata[0].accountnumber;

      const filterdata4 = this.currencies.filter(function (currency) {
        return currency.id == tocurrencyid;
      });
      const tocurrency = filterdata4[0].currency_code;
      this.tcurrency = tocurrency;

      const url = 'https://api.exchangeratesapi.io/latest?base=' + fromcurrency;

      this.apiProvider.getConversionApi(url).subscribe(
        async bankdata => {
          const res = bankdata;
          this.ontransferForm.controls.conversionRate.setValue(res.rates[tocurrency]);
          this.conversionRate = res.rates[tocurrency];
        }, async (error) => {

        });


    }
  }

  async transferAmount() {
    swal.fire({
      title: 'Enter Transaction Pin',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransactionpin = result.value;
        this.apiProvider.get('configurations/comissiontype/WALLET-OTHER-WALLET').subscribe(
          async comdata => {
            const bankcomission = comdata.result.bankcomission;
            const processingcomission = comdata.result.processingfees;
            const flatbankcomission = comdata.result.flatbankcomission;
            const flatprocessingcomission = comdata.result.flatprocessingfees;
            const fundamount = this.ontransferForm.value.amounttoTransfer;
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

            const dialogRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm' });
            dialogRef.componentInstance.message = 'You are about to transfer ' + finalamount + ' ' + this.frcurrency + ' . Please confirm ?  ';
            dialogRef.result.then((result) => {
              if (result) {
                const amountransferdata: any = {
                  sendermobilenumber: this.userDetails.mobilenumber,
                  senderaccountnumber: this.fromaccountno,
                  recieveraccountnumber: this.toaccountno,
                  recivermobilenumber: this.recieverUserObj.mobilenumber,
                  amount: this.amounttoCredit,
                  fromcurrency: this.frcurrencyid,
                  conversionrate: this.conversionRate,
                  tocurrency: this.tcurrencyid,
                  transactionpin: datatransactionpin,
                  fromcurrencycode: this.frcurrency,
                  tocurrencycode: this.tcurrency,
                  sendername: this.userDetails.firstName + ' ' + this.userDetails.lastName,
                  originalAmount: finalamount,
                  userid: this.userDetails.id,
                  recieveruserid: this.recieverUserObj.id,
                  recievername: this.recieverUserObj.firstName + ' ' + this.recieverUserObj.lastName,
                  charges: bankfees,
                  fees: processingfees,
                  senderareacode: this.userDetails.phonecode,
                  recieverareacode: this.recieverUserObj.phonecode,
                  enteredAmount: this.ontransferForm.value.amounttoTransfer,
                  taxes: taxes
                };
                this.apiProvider.post('wallet/transferfund', amountransferdata).subscribe(
                  async resdata => {
                    if (resdata.result == -1) {
                      this.notification.warning('Warning', 'Invalid transaction pin');
                    } else if (resdata.result == -2) {
                      this.notification.warning('Warning', 'Your account dosent have sufficient fund');

                    } else {
                      this.notification.success('Success', 'Your account to account transfer is successful');
                      // this.notificationMessageService.setMessage(true);
                      this.onChangeMobileForm.reset();
                      this.ontransferForm.reset();
                      this.showtransfer = false;
                    }
                  }, async () => {
                    this.notification.error('Error', 'Failed to transfer amount ,Please try after sometime.');
                  });
              }
            });
          }, async (error) => {
            this.notification.error('Error', 'Failed to transfer amount ,Please try after sometime.');
          });
      } else {
        this.notification.warning('Warning', 'Please enter transaction pin');
      }
    });
  }
}
