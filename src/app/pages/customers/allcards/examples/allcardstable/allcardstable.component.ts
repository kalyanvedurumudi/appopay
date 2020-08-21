import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Allcards } from '@app/pages/customers/models/allcards.model';
import { ReplaySubject, Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ApiProvider } from '@app/services/api-provider';
import { filter } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'air-antd-table-allcards',
  templateUrl: './allcardstable.component.html',
  styles: [
    `
      .table-operations {
        margin-bottom: 16px;
      }

      .table-operations > button {
        margin-right: 8px;
      }
    `,
  ],
})
export class AllcardsTableComponent implements OnInit {
  @Output() updateCstmr = new EventEmitter<Allcards>()

  subject$: ReplaySubject<Allcards[]> = new ReplaySubject<Allcards[]>(1);
  data$: Observable<Allcards[]> = this.subject$.asObservable();
  allcardss: Allcards[];
  cRSuperSet: Allcards[];
  userDetails: any;
  allcardlist = [];
  searchCtrl = new FormControl();
  currencies: Array<any>;
  cardslist = [];

  mapOfSort: { [key: string]: any } = {
    ccnumber: null,
    ccexpiry: null,
    cardtype: null,
    isdefault: null,
    firstname: null,
    lastname: null
  };
  listOfColumn = [
    {
      title: 'CARD NUMBER',
      compare: (a: Allcards, b: Allcards) => a.ccnumber.localeCompare(b.ccnumber),
      priority: 3
    },
    {
      title: 'CARD EXPIRY',
      compare: (a: Allcards, b: Allcards) => a.ccexpiry.localeCompare(b.ccexpiry),
      priority: 3
    },
    {
      title: 'CARD TYPE',
      compare: (a: Allcards, b: Allcards) => a.cardtype.localeCompare(b.cardtype),
      priority: 3
    },
    {
      title: 'IS DEFAULT CARD',
      compare: (a: Allcards, b: Allcards) => a.isdefault.localeCompare(b.isdefault),
      priority: 2
    },
    {
      title: 'FIRST NAME',
      compare: (a: Allcards, b: Allcards) => a.firstname.localeCompare(b.firstname),
      priority: 1
    },
    {
      title: 'LAST NAME',
      compare: (a: Allcards, b: Allcards) => a.lastname.localeCompare(b.lastname),
      priority: 1
    }
  ];

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private notification: NzNotificationService,
    private apiProvider: ApiProvider,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userDetails = this.storage.retrieve('userDetails');

    this.data$.pipe(
      filter<Allcards[]>(Boolean)
    ).subscribe(allcardss => {
      this.allcardss = allcardss;
      this.cRSuperSet = allcardss;
    });

    this.searchCtrl.valueChanges.subscribe(value => this.onFilterChange(value));

    this.getCurrency();
    this.usercardetails();
  }

  async getCurrency() {
    this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
      async resdata => {
        this.currencies = resdata.result;
      }, async () => { });
  }

  onFilterChange(value: string) {
    this.allcardss = this.cRSuperSet.filter((card) => {
      const reqVal = {
        ccnumber: card.ccnumber,
        ccexpiry: card.ccexpiry,
        cardtype: card.cardtype,
        isdefault: card.isdefault,
        firstname: card.firstname,
        lastname: card.lastname
      }
      return JSON.stringify(Object.values(reqVal)).toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });
  }

  usercardetails() {
    this.apiProvider.get('users/getcards/' + this.userDetails.id).subscribe(
      async resdata => {
        this.cardslist = resdata.result;
        this.getallcards();
      }, async () => { });

  }

  getallcards() {
    this.allcardlist = [];
    const cardsize = this.cardslist.length;
    let count = 0;
    this.cardslist.forEach((usercardmapping: any) => {
      const transactiontoken = usercardmapping.transactionid;
      const fetchdata = {
        transactionid: transactiontoken,
      };

      this.apiProvider.postNodeUrl('getbyVaultID', fetchdata).subscribe(
        async resdata => {
          console.log(resdata.customer_vault);
          let ares: any;
          if (resdata.customer_vault == "") {
            ares = {
              ccnumber: null,
              ccexpiry: null,
              cardtype: usercardmapping.cardtype,
              isdefault: usercardmapping.isdefault,
              id: usercardmapping.id,
              idCuenta: usercardmapping.idCuenta,
              idPlastico: usercardmapping.idPlastico,
              idAsociado: usercardmapping.idAsociado,
              firstname: usercardmapping.firstname,
              lastname: usercardmapping.lastname
            };
          } else {
            ares = {
              ccnumber: resdata.customer_vault.customer.cc_number,
              ccexpiry: resdata.customer_vault.customer.cc_exp,
              cardtype: usercardmapping.cardtype,
              isdefault: usercardmapping.isdefault,
              id: usercardmapping.id,
              idCuenta: usercardmapping.idCuenta,
              idPlastico: usercardmapping.idPlastico,
              idAsociado: usercardmapping.idAsociado,
              firstname: resdata.customer_vault.customer.first_name,
              lastname: resdata.customer_vault.customer.last_name
            };

            if (count == cardsize) {
              this.allcardlist.push(ares);
              this.getData().subscribe(allcards => {
                this.subject$.next(allcards);
              });
            }
          }

        }, async () => {

        });
      count++;
    });
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(this.allcardlist.map(claimrequest => new Allcards(claimrequest)));
  }

  sort(sortName: string, value: string): void {
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }

    if (sortName && value) {
      const toSort = [...this.allcardss];
      this.allcardss = [];
      this.allcardss = toSort.sort((a, b) => {
        if (!a.hasOwnProperty(sortName) || !b.hasOwnProperty(sortName)) {
          return 0;
        }
        const varA = a[sortName];
        const varB = b[sortName];
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        } else if (varA) {
          comparison = 1;
        } else if (varB) {
          comparison = -1;
        }
        return value === 'ascend' ? comparison * -1 : comparison;
      })
    }
  }

  createCustomer(allcards: Allcards): void {

    if (allcards) {

      const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
      const amexpRegEx = /^(?:3[47][0-9]{13})$/;
      const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
      const cooptavanzaRegEx = /^(?:60891700[0-9]{11})$/;
      let cardtype = '';
      let isvalid = true;
      if (visaRegEx.test(allcards.ccnumber)) {
        cardtype = 'VISA';
      } else if (mastercardRegEx.test(allcards.ccnumber)) {
        cardtype = 'MASTER';
      } else if (amexpRegEx.test(allcards.ccnumber)) {
        cardtype = 'AMEX';
      } else if (discovRegEx.test(allcards.ccnumber)) {
        cardtype = 'DISCOVER';
      } else if (cooptavanzaRegEx.test(allcards.ccnumber)) {
        cardtype = 'COOPTAVANZA';
      } else {
        isvalid = false;
        this.notification.warning('Warning', 'Please enter a valid card');
      }
      if (isvalid) {
        const cardfullName = allcards.fullname.split(' ');
        let isdetault = true;
        if (allcards.isdefault == 'Yes') {
          isdetault = true;
        } else {
          isdetault = false;
        }
        const inputdata = {
          firstName: this.userDetails.firstName,
          lastName: this.userDetails.lastName,
          ccnumber: allcards.ccnumber,
          ccexp: allcards.ccexpiry,
          cvv: allcards.cvv,
          id: this.userDetails.id,
          // tslint:disable-next-line:object-literal-shorthand
          cardtype: cardtype,
          isdefault: isdetault,
          cardfirstname: cardfullName[0],
          cardlastname: cardfullName[1],
        };
        this.spinner.show();
        this.apiProvider.post('users/savecardtype', inputdata).subscribe(
          async resdata => {
            if (resdata.result != 'SAVE_FAILED' && resdata.result != 'DUPLICATE') {
              if (resdata.result != 'COMMING_SOON') {
                this.linkCard(resdata.result, allcards.ccnumber);
              } else {
                this.spinner.hide();
                this.notification.warning('Warning', 'Option will be available soon');
              }

            } else {
              this.spinner.hide();
              this.notification.error('Error', 'Failed to save card / Card details might already exists,Please try after sometime');

            }
          }, async (error) => {
            this.notification.error('Error', 'failed to save card / Card details might already exists,Please try after sometime');
            this.spinner.hide();
          });
      }
    }
  }


  linkCard(transactionid, cardnumber) {

    const versateccontent = {
      card_token: cardnumber
    };
    this.apiProvider.postWithoutAuth('cardidentifications/checkversateccard', versateccontent).subscribe(
      async versatecres => {
        const IdCuenta = versatecres.result.IdCuenta;
        const IdPlastico = versatecres.result.IdPlastico;
        const IdAsociado = versatecres.result.IdAsociado;
        if (IdCuenta == null) {
          this.spinner.hide();
          this.notification.success('Success', 'Card saved successfully');
          this.usercardetails();
        } else {
          const cardcontent = {
            // tslint:disable-next-line:object-literal-shorthand
            IdCuenta: IdCuenta,
            // tslint:disable-next-line:object-literal-shorthand
            IdPlastico: IdPlastico,
            // tslint:disable-next-line:object-literal-shorthand
            IdAsociado: IdAsociado,
            // tslint:disable-next-line:object-literal-shorthand
            transactionid: transactionid
          };

          this.apiProvider.post('cardidentifications/linkcard', cardcontent).subscribe(
            async carddetails => {
              if (carddetails.result == 'SUCCESS') {
                this.spinner.hide();
                this.notification.success('Success', 'Card saved successfully');
                this.usercardetails();

              } else {
                this.spinner.hide();
              }
            }, async () => {
              this.spinner.hide();
            });
        }
      }, async () => {
        this.spinner.hide();
      });

  }

  cardbalance(customer) {
    this.storage.store('CARDDETAILS', customer);
    this.router.navigate(['/pages/cardbalance']);

  }
  cardhistory(customer) {
    this.storage.store('CARDDETAILS', customer);
    this.router.navigate(['/pages/cardhistory']);

  }

  cartocardtransfer(customer) {
    this.storage.store('CARDDETAILS', customer);
    this.router.navigate(['/pages/cardtransfer']);
  }

  confirmClaim(type, details) {
    this.storage.store('claimtype', type);
    this.storage.store('details', details);
    this.router.navigate(['/customers/claimconfirmation']);
  }
}
