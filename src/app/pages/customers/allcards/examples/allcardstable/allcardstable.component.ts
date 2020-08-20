import { Component, OnInit } from '@angular/core'
import { Allcards } from '@app/pages/customers/models/allcards.model';
import { ReplaySubject, Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ApiProvider } from '@app/services/api-provider';
import { filter } from 'rxjs/operators';

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
  

  subject$: ReplaySubject<Allcards[]> = new ReplaySubject<Allcards[]>(1);
  data$: Observable<Allcards[]> = this.subject$.asObservable();
  allcardss: Allcards[];
  cRSuperSet: Allcards[];
  
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
  userDetails: any;
  allcardlist = [];
  searchCtrl = new FormControl();
  currencies: Array<any>;
  cardslist = [];

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private apiProvider: ApiProvider
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
      }, async () => {});
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
      }, async () => {});

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
      this.allcardss = toSort.sort((a, b) =>{
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

  confirmClaim(type, details){
    this.storage.store('claimtype', type);
    this.storage.store('details', details);
    this.router.navigate(['/customers/claimconfirmation']);
  }
}
