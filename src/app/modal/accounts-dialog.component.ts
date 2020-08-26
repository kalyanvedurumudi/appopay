import { Component, Inject } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from 'src/app/services/api-provider';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'vex-accounts-dialog',
    templateUrl: './accounts-dialog.component.html',
    styleUrls: []
})
export class AccountsDialogComponent {
    userDetails: any;
    accounts: Array<any>;
    currencies: Array<any>;
    constructor(
        private activeModal: NgbActiveModal,
        private storage: LocalStorageService,
        private spinner: NgxSpinnerService,
        private apiProvider: ApiProvider) {
        this.getCurrency();
        this.userDetails = this.storage.retrieve('userDetails');
        this.latestUserDetails();
    }
    onNoClick(): void {
        this.activeModal.close();
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
        if (this.currencies && this.currencies.length > 0) {
            const filterdata = this.currencies.filter(function (currency) {
                return currency.id == cc;
            });
            return filterdata[0].currency_code;
        }
        return '';
    }

    confirmClick(acc): void {
        this.activeModal.close(acc);
    }
}
