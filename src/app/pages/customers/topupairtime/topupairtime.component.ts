import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { Bank } from '@app/modal/common-modal';
import { ApiProvider } from '@app/services/api-provider';
import { LocalStorageService } from 'ngx-webstorage';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil, take } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPaymentDialogComponent } from '@app/modal/confirm-payment-dialog.component';
import { CardsDialogComponent } from '@app/modal/cards-dialog.component';
import { ConfirmationDialogComponent } from '@app/modal/confirmation-dialog.component';
import { AccountsDialogComponent } from '@app/modal/accounts-dialog.component';
declare var swal: any;

@Component({
  selector: 'app-topupairtime',
  templateUrl: './topupairtime.component.html',
  styleUrls: ['./topupairtime.component.scss'],
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
export class TopupAirtimeComponent implements OnInit {

  selectCtrl: FormControl = new FormControl();
  inputType = 'password';
  visible = false;

  carriers: Array<any>;
  userObj: any;
  accounts: Array<any>;
  currencies: Array<any>;
  productdetails: Array<any>;
  productamts: Array<any>;
  isRadio = false;
  fromAccount = null;
  frcurrencyid = 0;
  fromaccountno = null;
  frcurrency = null;
  exchangerate = 0;
  loaderToShow: any;
  productCode = null;
  countries: Array<any>;
  topupamount = null;
  topupform: any;
  valueForm: any;
  carriername = null;
  fraccount = null;
  currencycode = null;
  accountnumber = null;
  currentbalance = null;
  cardnumber = null;
  cardexp = null;
  cardcvv = null;
  cardfullname = null;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private apiProvider: ApiProvider,
    private storage: LocalStorageService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {
    this.userObj = this.storage.retrieve('userDetails');
  }

  ngOnInit() {
    this.valueForm = this.formBuilder.group({
      topUp:[null, Validators.compose([
        Validators.required, Validators.pattern('^[0-9]*$')
      ])]
    });
    this.topupform = this.formBuilder.group({
      selectCode: [null, Validators.compose([
        Validators.required
      ])],
      mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')
      ])],
      carrier: [null, Validators.compose([
        Validators.required
      ])]

    });
    this.getCountry();
    this.getCurrency();
    this.latestUserDetails();
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

  resetform() {
    this.topupform.reset();
    this.productamts = [];
  }

  latestUserDetails() {
    const mobileno = this.userObj.mobilenumber;
    const areacode = this.userObj.phonecode;
    const usertype = this.userObj.usertype;
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
    this.apiProvider.get('configurations/approvedcountries/TOPUP').subscribe(
      async resdata => {
        this.countries = resdata.result;
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

  getTopupCarriers() {
    // const countryname = this.bankCtrl.value.areacode;
    const payload: any = {
      countrycode: this.topupform.value.selectCode.areacode
    };
    this.spinner.show();
    this.apiProvider.posttopup('getProducts', payload).subscribe(
      async resdata => {
        const carrresult = resdata.Products;
        const allcarriers = carrresult.filter(function (crr) {
          return crr.ProductType == 'TOPUP';
        });
        this.carriers = allcarriers;
        if (this.carriers.length == 0) {
          this.notification.warning('Warning', 'Service is not available for the selected country');
        }
        console.log(this.carriers);
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });

  }

  getproductdetails() {
    const carrid = this.topupform.value.carrier;
    const productdetails = this.carriers.filter(function (carriers) {
      return carriers.CarrierId == carrid;
    });
    this.productamts = productdetails[0].Amounts;
    this.productCode = productdetails[0].ProductCode;
    this.carriername = productdetails[0].ProductName;

  }

  makepayment(amts) {

    if (this.fraccount == null) {
      this.notification.warning('Warning', 'Please select the account');
    } else {
      const accountid = this.fraccount;
      const filterdata3 = this.accounts.filter(function (accounts) {
        return accounts.id == accountid;
      });

      const fromcurrencyid = filterdata3[0].currencyid;
      this.frcurrencyid = fromcurrencyid;
      this.fromaccountno = filterdata3[0].accountnumber;

      const filterdata1 = this.currencies.filter(function (currency) {
        return currency.id == fromcurrencyid;
      });
      const fromcurrency = filterdata1[0].currency_code;
      this.frcurrency = fromcurrency;

      // const url = 'https://api.exchangeratesapi.io/latest?base=' + amts.destCurr;
      this.topupamount = amts.destAmt;
      this.getexchangerates(fromcurrency, filterdata3[0], amts.DestAmt, amts.DestCurr);
    }
  }

  makepaymentCard(amts) {

    const fromcurrencycode = this.currencycode;
    const fromcurrency = this.currencycode;
    this.frcurrency = fromcurrency;


    const filterdata1 = this.currencies.filter(function (currency) {
      return currency.currency_code == fromcurrencycode;
    });
    this.frcurrencyid = filterdata1[0].id;

    // const url = 'https://api.exchangeratesapi.io/latest?base=' + amts.destCurr;
    this.topupamount = amts.destAmt;
    this.getexchangeratesCard(fromcurrency, amts.DestAmt, amts.DestCurr);


  }

  async getexchangeratesCard(fromcurrency: any, amount: any, destcurrency: any) {
    this.spinner.show();
    this.apiProvider.get('configurations/currencyconversions/' + destcurrency).subscribe(
      async resdata => {
        let filterdata3 = resdata.result.filter(function (currenices) {
          return currenices.exchangecurrency == fromcurrency;
        });
        if (!(filterdata3 && filterdata3.length > 0)) {
          filterdata3 = resdata.result.filter(function (currenices) {
            return currenices.exchangecurrency == 'USD';
          });
        }
        if (filterdata3 && filterdata3.length > 0) {
          this.exchangerate = filterdata3[0].conversionrate;
          console.log(this.exchangerate);
          const newamount = (this.exchangerate * amount).toFixed(2);
          this.startpaymentprocess(newamount);
        } else {
          this.notification.error('Error', 'Selected currencies did not match');
        }
        this.spinner.hide();
      }, async () => {
        this.notification.error('Error', 'Something went wrong while processing your request .Please try after sometime');
        this.spinner.hide();
      });


  }



  async getexchangerates(fromcurrency: any, filterdata: any, amount: any, destcurrency: any) {
    this.spinner.show();
    this.apiProvider.get('configurations/currencyconversions/' + destcurrency).subscribe(
      async resdata => {
        let filterdata3 = resdata.result.filter(function (currenices) {
          return currenices.exchangecurrency == fromcurrency;
        });
        
        if (!(filterdata3 && filterdata3.length > 0)) {
          filterdata3 = resdata.result.filter(function (currenices) {
            return currenices.exchangecurrency == 'USD';
          });
        }

        if (filterdata3 && filterdata3.length > 0) {
          this.exchangerate = filterdata3[0].conversionrate;
          console.log(this.exchangerate);
          const newamount = (this.exchangerate * amount).toFixed(2);
          console.log(filterdata);
          if (filterdata.currentbalance < newamount) {
            this.notification.warning('Warning', 'Your account doesnt have enough balance to buy topup');
          } else {
            this.startpaymentprocess(newamount);
          }
        } else {
          this.notification.error('Error', 'Selected currencies did not match');          
        }
        this.spinner.hide();
      }, async () => {
        this.notification.error('Error', 'Something went wrong while processing your request .Please try after sometime');
        this.spinner.hide();
      });
  }

  choosePayment(amount) {
    if (!amount) {
      amount = {
        DestAmt: this.valueForm.get('topUp').value,
        DestCurr: this.productamts[0].DestCurr
      }
    }
    const dialogRef = this.modalService.open(ConfirmationPaymentDialogComponent, { size: 'sm' });
    dialogRef.result.then(sresult => {
      if (!sresult) {
        const dialogRefAcc = this.modalService.open(CardsDialogComponent, { size: 'lg' });
        dialogRefAcc.result.then(sresultCard => {
          console.log(sresultCard);
          this.cardcvv = sresultCard.value.cardCvv;
          this.cardexp = sresultCard.value.expirationMonth;
          this.cardnumber = sresultCard.value.cardNumber;
          this.cardfullname = sresultCard.value.cardFullName;
          this.currencycode = sresultCard.value.currency;
          this.makepaymentCard(amount);
        }, () => {
        });
      } else {
        const dialogRefAcc = this.modalService.open(AccountsDialogComponent, { size: 'lg' });
        dialogRefAcc.result.then(sresultAcc => {
          console.log(sresultAcc);
          this.fraccount = sresultAcc.id;
          this.makepayment(amount);
        }, () => {
        });
      }
    }, () => {
    });

  }

  async startpaymentprocess(topupamount) {
    swal.fire({
      title: 'Enter Transaction Pin',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransactionpin = result.value;
        this.spinner.show();
        this.apiProvider.get('configurations/comissiontype/WALLET-TOPUP').subscribe(
          async comdata => {
            const bankcomission = comdata.result.bankcomission;
            const processingcomission = comdata.result.processingfees;
            const flatbankcomission = comdata.result.flatbankcomission;
            const flatprocessingcomission = comdata.result.flatprocessingfees;
            const fundamount = topupamount;
            let bankfees = (bankcomission * fundamount).toFixed(2);
            const newamount = parseFloat(fundamount) + parseFloat(bankfees);
            let processingfees = (fundamount * processingcomission).toFixed(2);
            let finalamount = newamount + parseFloat(processingfees);
            bankfees = (parseFloat(bankfees) + flatbankcomission).toFixed(2);
            processingfees = (parseFloat(processingfees) + flatprocessingcomission).toFixed(2);
            const flatfees = (flatbankcomission + flatprocessingcomission).toFixed(2);
            finalamount = finalamount + parseFloat(flatfees);
            this.spinner.hide();

            const dialogRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm' });
            dialogRef.componentInstance.message = 'You are about to pay ' + finalamount + ' ' + this.frcurrency + ' for purchase of topup . Please confirm ?  ';
            dialogRef.result.then((result) => {
              if (result) {
                const amountransferdata: any = {
                  sendermobilenumber: this.userObj.mobilenumber,
                  senderaccountnumber: this.fromaccountno,
                  amount: topupamount,
                  fromcurrency: this.frcurrencyid,
                  transactionpin: datatransactionpin,
                  fromcurrencycode: this.frcurrency,
                  sendername: this.userObj.firstName + ' ' + this.userObj.lastName,
                  originalAmount: finalamount,
                  userid: this.userObj.id,
                  charges: bankfees,
                  fees: processingfees,
                  productcode: this.productCode,
                  carrier: this.carriername,
                  senderareacode: this.userObj.phonecode,
                  recievermobilernumber: this.topupform.value.mobileNumber,
                  recieverareacode: this.topupform.value.selectCode,
                  fullName: this.cardfullname,
                  ccnumber: this.cardnumber,
                  cvv: this.cardcvv,
                  ccexp: this.cardexp,
                  payamount: finalamount
                };
                if (this.cardnumber == null) {
                  this.spinner.show();
                  this.apiProvider.post('wallet/topup', amountransferdata).subscribe(
                    async resdata => {
                      if (resdata.result == 'INVALID_PIN') {
                        this.notification.warning('Warning', 'Invalid transaction pin');

                      } else if (resdata.result == 'INSUFFICIENT_BALANCE') {
                        this.notification.warning('Warning', 'Your account dosent have sufficient fund');

                      } else if (resdata.result == 'FAILURE') {
                        this.notification.error('Error', 'Failed to buy topup amount ,Please try after sometime');

                      } else if (resdata.result == 'SUCCESS') {
                        this.notification.success('Success', 'You have successfully purchased the topup amount, Will be reflected with in 24 hr');
                        this.topupform.reset();
                        this.productamts = [];
                        // this.notificationMessageService.setMessage(true);

                      } else {
                        this.notification.error('Error', resdata.result);

                      }
                      this.spinner.hide();
                    }, async () => {
                      this.notification.error('Error', 'Failed to buy topup amount ,Please try after sometime');
                      this.spinner.hide();
                    });
                } else {
                  this.spinner.show();
                  this.apiProvider.post('wallet/topupcard', amountransferdata).subscribe(
                    async resdata => {
                      if (resdata.result == 'INVALID_PIN') {
                        this.notification.warning('Warning', 'Invalid transaction pin');

                      } else if (resdata.result == 'FAILURE') {
                        this.notification.error('Error', 'Failed to buy topup amount ,Please try after sometime');

                      } else if (resdata.result == 'SUCCESS') {
                        this.notification.success('Success', 'You have successfully purchased the topup amount, Will be reflected with in 24 hr');
                        this.topupform.reset();
                        this.productamts = [];
                        // this.notificationMessageService.setMessage(true);

                      } else {
                        this.notification.error('Error', resdata.result);
                      }
                      this.spinner.hide();
                    }, async (error) => {
                      this.notification.error('Error', 'Failed to buy topup amount ,Please try after sometime');
                      this.spinner.hide();
                    });
                }
              }
            }, (reason) => {
            });
          }, async (error) => {
            this.notification.error('Error', 'Failed to buy topup amount ,Please try after sometime');
          });
      } else {
        this.notification.warning('Warning', 'Please enter transaction pin');
      }
    });
  }
}
