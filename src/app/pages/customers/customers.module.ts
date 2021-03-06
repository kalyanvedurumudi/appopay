import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { CustomersRouterModule } from './customers-routing.module'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { TransactionListtableModule } from 'src/app/pages/customers/transactionlist/examples/examples.module'
import { AllcardsTableModule } from 'src/app/pages/customers/allcards/examples/examples.module'
import { ClaimrequestTableModule } from 'src/app/pages/customers/claimrequest/examples/examples.module'
import { CardhistoryTableModule } from 'src/app/pages/customers/cardhistory/examples/examples.module'
import { TransactionstatusTableModule } from 'src/app/pages/customers/transactionstatus/examples/examples.module'
import { CustomersupportTableModule } from 'src/app/pages/customers/customersupport/examples/examples.module'
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// layout
import { TransactionListComponent } from 'src/app/pages/customers/transactionlist/transactionlist.component'
import { AllCardsComponent } from 'src/app/pages/customers/allcards/allcards.component'
import { ClaimRequestComponent } from 'src/app/pages/customers/claimrequest/claimrequest.component'
import { BaseCurrencyComponent } from 'src/app/pages/customers/basecurrency/basecurrency.component'
import { ChangeCurrencyComponent } from 'src/app/pages/customers/changecurrency/changecurrency.component'
import { CardbaseCurrencyComponent } from 'src/app/pages/customers/cardbasecurrency/cardbasecurrency.component'
import { CardchangeCurrencyComponent } from 'src/app/pages/customers/cardchangecurrency/cardchangecurrency.component'
import { CardHistoryComponent } from 'src/app/pages/customers/cardhistory/cardhistory.component'

import { TransactionStatusComponent } from 'src/app/pages/customers/transactionstatus/transactionstatus.component'


import { CardTransferComponent } from 'src/app/pages/customers/cardtransfer/cardtransfer.component'

import { CardBalanceComponent } from 'src/app/pages/customers/cardbalance/cardbalance.component'

import { PayBillsComponent } from 'src/app/pages/customers/paybills/paybills.component'
import { TopupAirtimeComponent } from 'src/app/pages/customers/topupairtime/topupairtime.component'
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { EtransfersComponent } from 'src/app/pages/customers/etransfers/etransfers.component'
import { BankDepositsComponent } from 'src/app/pages/customers/bankdeposits/bankdeposits.component'
import { IntraaccountTransfersComponent } from 'src/app/pages/customers/intraaccounttransfers/intraaccounttransfers.component'
import { AccountTransfersComponent } from 'src/app/pages/customers/accounttransfers/accounttransfers.component'

import { SendMoneyComponent } from 'src/app/pages/customers/sendmoney/sendmoney.component'

import { CustomerSupportComponent } from 'src/app/pages/customers/customersupport/customersupport.component'

import { StartEnrollmentComponent } from 'src/app/pages/customers/startenrollment/startenrollment.component'

import { CompleteEnrollmentComponent } from 'src/app/pages/customers/completeenrollment/completeenrollment.component'
import { AccountSettingsComponent } from 'src/app/pages/customers/accountsettings/accountsettings.component'

import { StatusActivationcardComponent } from 'src/app/pages/customers/statusactivationcard/statusactivationcard.component'


import { QuickSwitchComponent } from 'src/app/pages/customers/quickswitch/quickswitch.component'

import { BalanceTransactionComponent } from 'src/app/pages/customers/balancetransaction/balancetransaction.component'

import { BanktoBanktransferComponent } from 'src/app/pages/customers/banktobanktransfer/banktobanktransfer.component'

import { DirectPaymentComponent } from 'src/app/pages/customers/directpayment/directpayment.component'

import { ProfileComponent } from 'src/app/pages/customers/profile/profile.component'
import { ClaimconfirmationComponent } from 'src/app/pages/customers/claimconfirmation/claimconfirmation.component'
import { CKEditorComponent } from './ckeditor/ckeditor.component';
import { CKEditorService } from '@app/services/ckeditor.service';
import { TreeviewModule } from 'ngx-treeview';
import { AccountsDialogComponent } from '@app/modal/accounts-dialog.component';
import { CardsDialogComponent } from '@app/modal/cards-dialog.component';
import { ConfirmationPaymentDialogComponent } from '@app/modal/confirm-payment-dialog.component';
import { ConfirmationDialogComponent } from '@app/modal/confirmation-dialog.component';

const COMPONENTS = [

  BaseCurrencyComponent,
  ChangeCurrencyComponent,
  CardbaseCurrencyComponent,
  CardchangeCurrencyComponent,
  CardHistoryComponent,
  PayBillsComponent,
  TopupAirtimeComponent,
  EtransfersComponent,
  BankDepositsComponent,
  IntraaccountTransfersComponent,
  AccountTransfersComponent,
  AllCardsComponent,
  SendMoneyComponent,
  TransactionStatusComponent,
  CustomerSupportComponent,
  StartEnrollmentComponent,
  CompleteEnrollmentComponent,
  AccountSettingsComponent,
  StatusActivationcardComponent,
  QuickSwitchComponent,
  BalanceTransactionComponent,
  BanktoBanktransferComponent,
  DirectPaymentComponent,
  ProfileComponent,
  TransactionListComponent,
  ClaimconfirmationComponent,
  ClaimRequestComponent,
  CardTransferComponent,
  CardBalanceComponent,
  CKEditorComponent,
  AccountsDialogComponent,
  CardsDialogComponent,
  ConfirmationPaymentDialogComponent,
  ConfirmationDialogComponent
]

@NgModule({
  imports: [
    SharedModule,
    NzSwitchModule,
    CustomersRouterModule,
    NgbModule,
    FormsModule,
    TransactionstatusTableModule,
    CardhistoryTableModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    AllcardsTableModule,
    CustomersupportTableModule,
    TransactionListtableModule,
    ClaimrequestTableModule,
    CKEditorModule,
    TreeviewModule.forRoot()
  ],
  declarations: [...COMPONENTS],
  entryComponents: [
    CardsDialogComponent,
    AccountsDialogComponent,
    ConfirmationPaymentDialogComponent,
    ConfirmationDialogComponent
  ],
  providers: [CKEditorService, NgbActiveModal]
})
export class CustomersModule { }
