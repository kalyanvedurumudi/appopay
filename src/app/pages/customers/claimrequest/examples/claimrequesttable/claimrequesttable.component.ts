import { Component, OnInit } from '@angular/core'
import { ReplaySubject, Observable, of } from 'rxjs';
import { Claimrequest } from '@app/pages/customers/models/claimrequest.model';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from '@app/services/api-provider';
import { filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'air-antd-table-claimrequest',
  templateUrl: './claimrequesttable.component.html',
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
export class ClaimrequestTableComponent implements OnInit {

  subject$: ReplaySubject<Claimrequest[]> = new ReplaySubject<Claimrequest[]>(1);
  data$: Observable<Claimrequest[]> = this.subject$.asObservable();
  claimrequests: Claimrequest[];
  cRSuperSet: Claimrequest[];
  
  mapOfSort: { [key: string]: any } = {
    transactionid: null,
    messagetext: null,
    transferamount: null,
    currencycode: null,
    isclaimtext: null
  };
  listOfColumn = [
    {
      title: 'TRANSACTION ID',
      compare: (a: Claimrequest, b: Claimrequest) => a.transactionid.localeCompare(b.transactionid),
      priority: 3
    },
    {
      title: 'DESCRIPTION',
      compare: (a: Claimrequest, b: Claimrequest) => a.messagetext.localeCompare(b.messagetext),
      priority: 3
    },
    {
      title: 'CLAIM AMOUNT',
      compare: (a: Claimrequest, b: Claimrequest) => a.transferamount.localeCompare(b.transferamount),
      priority: 3
    },
    {
      title: 'CURRENCY CODE',
      compare: (a: Claimrequest, b: Claimrequest) => a.currencycode.localeCompare(b.currencycode),
      priority: 2
    },
    {
      title: 'IS CLAIMED',
      compare: (a: Claimrequest, b: Claimrequest) => a.isclaimtext.localeCompare(b.isclaimtext),
      priority: 1
    }
  ];
  userDetails: any;
  claimhistory = [];
  searchCtrl = new FormControl();

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private apiProvider: ApiProvider
  ) { }

  ngOnInit() {
    this.userDetails = this.storage.retrieve('userDetails');

    this.data$.pipe(
      filter<Claimrequest[]>(Boolean)
    ).subscribe(claimrequests => {
      this.claimrequests = claimrequests;
      this.cRSuperSet = claimrequests;
    });

    this.searchCtrl.valueChanges.subscribe(value => this.onFilterChange(value));

    this.getMyClaims();
  }

  onFilterChange(value: string) {
    this.claimrequests = this.cRSuperSet.filter((claim) => {
      const reqVal = { 
        transactionid: claim.transactionid,
        messagetext: claim.messagetext,
        transferamount: claim.transferamount,
        currencycode: claim.currencycode,
        isclaimtext: claim.isclaimtext
      }; 
      return JSON.stringify(Object.values(reqVal)).toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });
  }


  getMyClaims() {
    const mobileno = this.userDetails.mobilenumber;
    const areacode = this.userDetails.phonecode;
    this.spinner.show();

    this.apiProvider.get('wallet/claimtransfer/' + mobileno + '/' + areacode).subscribe(
      async resdata => {
        resdata.result.forEach((claimhistory: any) => {
          let isclaim = 'PAID';
          if (claimhistory.isclaimed == null) {
            isclaim = 'PENDING';
          }
          const claimdata: any = {
            id: claimhistory.id,
            transferamount: claimhistory.transferamount,
            currencycode: claimhistory.currencycode,
            isclaimed: claimhistory.isclaimed,
            transactionid: claimhistory.transactionid,
            areacode: claimhistory.areacode,
            charges: claimhistory.charges,
            fees: claimhistory.fees,
            firstname: claimhistory.firstname,
            fromcurrency: claimhistory.fromcurrency,
            fromcurrencycode: claimhistory.fromcurrencycode,
            lastname: claimhistory.lastname,
            mobilenumber: claimhistory.mobilenumber,
            originalAmount: claimhistory.originalAmount,
            recievername: claimhistory.recievername,
            securityanswer: claimhistory.securityanswer,
            securityquestion: claimhistory.securityquestion,
            senderaccountnumber: claimhistory.senderaccountnumber,
            senderareacode: claimhistory.senderareacode,
            sendermobilenumber: claimhistory.sendermobilenumber,
            sendername: claimhistory.sendername,
            transactionpin: claimhistory.transactionpin,
            userid: claimhistory.userid,
            messagetext: 'You have recieved a claim request of  (' + claimhistory.transferamount + ' ' + claimhistory.currencycode + ')',
            isclaimtext: isclaim
          };

          this.claimhistory.push(claimdata);
          this.getData().subscribe(claimrequests => {
            this.subject$.next(claimrequests);
          });

        });
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });
  }
  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(this.claimhistory.map(claimrequest => new Claimrequest(claimrequest)));
  }

  sort(sortName: string, value: string): void {
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }
    
    if (sortName && value) {
      const toSort = [...this.claimrequests];
      this.claimrequests = [];
      this.claimrequests = toSort.sort((a, b) =>{
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
