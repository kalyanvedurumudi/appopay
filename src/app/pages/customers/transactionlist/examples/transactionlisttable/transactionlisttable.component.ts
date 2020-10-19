import { Component, OnInit } from '@angular/core'
import { ApiProvider } from '@app/services/api-provider'
import { LocalStorageService } from 'ngx-webstorage'

@Component({
  selector: 'air-antd-table-reset-filter',
  templateUrl: './transactionlisttable.component.html',
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
export class TransactionListtableComponent implements OnInit {
  userdetails: any
  accountdetails: any
  listOfDisplayData = []
  originalData = []
  latestRec: any
  mapOfSort: { [key: string]: any } = {
    transactionid: null,
    transactiondate: null,
    transactionamount: null,
    transactiontype: null,
    transactionstatus: null,
    pendingbalance: null,
    transactiondescription: null,
  }
  sortName: string | null = null
  sortValue: string | null = null

  sort(sortName: string, value: string): void {
    this.sortName = sortName
    this.sortValue = value
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }
  }

  search(serTxt: string): void {
    this.listOfDisplayData = this.originalData.filter((row: any) => {
      return (
        row.transactionid.toLocaleLowerCase().includes(serTxt.toLocaleLowerCase()) ||
        row.transactiontype.toLocaleLowerCase().includes(serTxt.toLocaleLowerCase()) ||
        row.transactionstatus.toLocaleLowerCase().includes(serTxt.toLocaleLowerCase()) ||
        row.pendingbalance
          .toString()
          .toLocaleLowerCase()
          .includes(serTxt.toLocaleLowerCase()) ||
        row.transactiondescription.toLocaleLowerCase().includes(serTxt.toLocaleLowerCase())
      )
    })
  }

  getWalletHistory() {
    const payload: any = {
      accountnumber: this.accountdetails.accountnumber,
    }

    this.apiProvider.post('wallet/transactions', payload).subscribe(
      async resdata => {
        this.listOfDisplayData = []
        console.log(this.listOfDisplayData)
        this.latestRec = resdata.result[0]
        resdata.result.forEach((wallethistory: any) => {
          const historydata: any = {
            transactionid: wallethistory.transactionid,
            transactiondate: new Date(wallethistory.transactiondate),
            transactionamount: wallethistory.transactionamount,
            transactiontype: wallethistory.transactiontype,
            transactionstatus: wallethistory.transactionstatus,
            pendingbalance: wallethistory.pendingbalance,
            transactiondescription: wallethistory.transactiondescription,
          }
          this.listOfDisplayData.push(historydata)
        })
        this.originalData = [...this.listOfDisplayData]
      },
      async () => {},
    )
  }

  resetSortAndFilters(): void {
    this.sortName = null
    this.sortValue = null
    this.mapOfSort = {
      transactionid: null,
      transactiondate: null,
      transactionamount: null,
      transactiontype: null,
      transactionstatus: null,
      pendingbalance: null,
      transactiondescription: null,
    }
  }

  ngOnInit() {
    this.userdetails = this.storage.retrieve('userDetails')

    this.accountdetails = this.storage.retrieve('account')
    if (!this.accountdetails) {
      this.accountdetails = this.userdetails.customerdetails.customeraccount[0]
    }
    if (this.accountdetails) {
      this.getWalletHistory()
    }
  }

  constructor(private apiProvider: ApiProvider, private storage: LocalStorageService) {}
}
