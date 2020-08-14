import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// layout
import { TransactionListComponent } from 'src/app/pages/customers/transactionlist/transactionlist.component'
import { AllCardsComponent } from 'src/app/pages/customers/allcards/allcards.component'
import { CardHistoryComponent } from 'src/app/pages/customers/cardhistory/cardhistory.component'
import { TransactionStatusComponent } from 'src/app/pages/customers/transactionstatus/transactionstatus.component'
import { ClaimRequestComponent } from 'src/app/pages/customers/claimrequest/claimrequest.component'
import { BaseCurrencyComponent } from 'src/app/pages/customers/basecurrency/basecurrency.component'
import { ChangeCurrencyComponent } from 'src/app/pages/customers/changecurrency/changecurrency.component'
import { CardbaseCurrencyComponent } from 'src/app/pages/customers/cardbasecurrency/cardbasecurrency.component'
import { CardchangeCurrencyComponent } from 'src/app/pages/customers/cardchangecurrency/cardchangecurrency.component'

import { PayBillsComponent } from 'src/app/pages/customers/paybills/paybills.component'
import { TopupAirtimeComponent } from 'src/app/pages/customers/topupairtime/topupairtime.component'
import { EtransfersComponent } from 'src/app/pages/customers/etransfers/etransfers.component'
import { BankDepositsComponent } from 'src/app/pages/customers/bankdeposits/bankdeposits.component'
import { IntraaccountTransfersComponent } from 'src/app/pages/customers/intraaccounttransfers/intraaccounttransfers.component'
import { AccountTransfersComponent } from 'src/app/pages/customers/accounttransfers/accounttransfers.component'

import { SendMoneyComponent } from 'src/app/pages/customers/sendmoney/sendmoney.component'

import { CustomerSupportComponent } from 'src/app/pages/customers/customersupport/customersupport.component'

import { StartEnrollmentComponent } from 'src/app/pages/customers/startenrollment/startenrollment.component'
import { AccountSettingsComponent } from 'src/app/pages/customers/accountsettings/accountsettings.component'
import { CompleteEnrollmentComponent } from 'src/app/pages/customers/completeenrollment/completeenrollment.component'
import { StatusActivationcardComponent } from 'src/app/pages/customers/statusactivationcard/statusactivationcard.component'
import { BalanceTransactionComponent } from 'src/app/pages/customers/balancetransaction/balancetransaction.component'
import { BanktoBanktransferComponent } from 'src/app/pages/customers/banktobanktransfer/banktobanktransfer.component'
import { DirectPaymentComponent } from 'src/app/pages/customers/directpayment/directpayment.component'
import { QuickSwitchComponent } from 'src/app/pages/customers/quickswitch/quickswitch.component'
import { ProfileComponent } from 'src/app/pages/customers/profile/profile.component'
import { ClaimconfirmationComponent } from 'src/app/pages/customers/claimconfirmation/claimconfirmation.component'
import { CardTransferComponent } from 'src/app/pages/customers/cardtransfer/cardtransfer.component'

import { CardBalanceComponent } from 'src/app/pages/customers/cardbalance/cardbalance.component'
const routes: Routes = [
  {
    path: 'basecurrency',
    component: BaseCurrencyComponent,
    data: { title: 'Basecurrency' },
    canActivate: [AuthGuard],
  },
    {
    path: 'changecurrency',
    component: ChangeCurrencyComponent,
    data: { title: 'Changecurrency' },
    canActivate: [AuthGuard],
  },
  {
    path: 'cardbasecurrency',
    component: CardbaseCurrencyComponent,
    data: { title: 'cardbasecurrency' },
    canActivate: [AuthGuard],
  },
    {
    path: 'cardchangecurrency',
    component: CardchangeCurrencyComponent,
    data: { title: 'cardchangecurrency' },
    canActivate: [AuthGuard],
  },
  {
    path: 'claimrequest',
    component: ClaimRequestComponent,
    data: { title: 'Claim Request' },
    canActivate: [AuthGuard],
  },
    {
    path: 'paybills',
    component: PayBillsComponent,
    data: { title: 'Pay Bills' },
    canActivate: [AuthGuard],
  },
     {
    path: 'topupairtime',
    component: TopupAirtimeComponent,
    data: { title: 'Topupairtime' },
    canActivate: [AuthGuard],
  },
    {
    path: 'etransfers',
    component: EtransfersComponent,
    data: { title: 'Etransfers' },
    canActivate: [AuthGuard],
  },
  
   {
    path: 'bankdeposits',
    component: BankDepositsComponent,
    data: { title: 'Bankdeposits' },
    canActivate: [AuthGuard],
  },
   {
    path: 'intraaccounttransfers',
    component: IntraaccountTransfersComponent,
    data: { title: 'IntraaccountTransfers' },
    canActivate: [AuthGuard],
  },
  {
    path: 'accounttransfers',
    component: AccountTransfersComponent,
    data: { title: 'accountTransfers' },
    canActivate: [AuthGuard],
  },
   {
    path: 'allcards',
    component: AllCardsComponent,
    data: { title: 'allCards' },
    canActivate: [AuthGuard],
  },
    {
    path: 'sendmoney',
    component: SendMoneyComponent,
    data: { title: 'sendMoney' },
    canActivate: [AuthGuard],
  },
  
   {
    path: 'transferstatus',
    component: TransactionStatusComponent,
    data: { title: 'transferStatus' },
    canActivate: [AuthGuard],
  },
      {
    path: 'customersupport',
    component: CustomerSupportComponent,
    data: { title: 'CustomerSupport' },
    canActivate: [AuthGuard],
  },
  
       {
    path: 'transactionlist',
    component: TransactionListComponent,
    data: { title: 'TransactionList' },
    canActivate: [AuthGuard],
  },
  
    {
    path: 'startenrollment',
    component: StartEnrollmentComponent,
    data: { title: 'Start Enrollment' },
    canActivate: [AuthGuard],
  },
    {
    path: 'completeenrollment',
    component: CompleteEnrollmentComponent,
    data: { title: 'Complete Enrollment' },
    canActivate: [AuthGuard],
  },
      {
    path: 'accountsettings',
    component: AccountSettingsComponent,
    data: { title: 'AccountSettings' },
    canActivate: [AuthGuard],
  },
      {
    path: 'statusactivationcard',
    component: StatusActivationcardComponent,
    data: { title: 'StatusActivationcard' },
    canActivate: [AuthGuard],
  },
      {
    path: 'quickswitch',
    component: QuickSwitchComponent,
    data: { title: 'quickswitch' },
    canActivate: [AuthGuard],
  },
  
     {
    path: 'balancetransaction',
    component: BalanceTransactionComponent,
    data: { title: 'BalanceTransaction' },
    canActivate: [AuthGuard],
  },
  
    {
    path: 'banktobanktransfer',
    component: BanktoBanktransferComponent,
    data: { title: 'BanktoBanktransfer' },
    canActivate: [AuthGuard],
  },
  
    {
    path: 'directpayment',
    component: DirectPaymentComponent,
    data: { title: 'DirectPayment' },
    canActivate: [AuthGuard],
  },
   
    {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile' },
    canActivate: [AuthGuard],
  },
  
    {
    path: 'claimconfirmation',
    component: ClaimconfirmationComponent,
    data: { title: 'Claimconfirmation' },
    canActivate: [AuthGuard],
  },
    
    {
    path: 'cardhistory',
    component: CardHistoryComponent,
    data: { title: 'Cardhistory' },
    canActivate: [AuthGuard],
  },
     {
    path: 'cardtransfer',
    component: CardTransferComponent,
    data: { title: 'Cardtransfer' },
    canActivate: [AuthGuard],
  },
     {
    path: 'cardbalance',
    component: CardBalanceComponent,
    data: { title: 'CardBalance' },
    canActivate: [AuthGuard],
  },
  
  
  
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class CustomersRouterModule {}
