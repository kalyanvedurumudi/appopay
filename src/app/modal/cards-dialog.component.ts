import { Component, Inject } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from 'src/app/services/api-provider';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'vex-cards-dialog',
    templateUrl: './cards-dialog.component.html',
    styleUrls: []
})
export class CardsDialogComponent {
    userDetails: any;
    accounts: Array<any>;
    currencies: Array<any>;
    allcardlist: Array<any>;
    cardslist: [];
    public oncardForm: any;
    constructor(
        private activeModal: NgbActiveModal,
        private storage: LocalStorageService,
        private apiProvider: ApiProvider,
        private formBuilder: FormBuilder) {
        this.oncardForm = this.formBuilder.group({
            cardFullName: [null, Validators.compose([
                Validators.required, Validators.maxLength(30)
            ])],
            currency: [null, Validators.compose([
                Validators.required
            ])],
            cardNumber: [null, Validators.compose([
                Validators.required, Validators.minLength(14), Validators.maxLength(21), Validators.pattern('^[0-9]*$')
            ])],
            expirationMonth: [null, Validators.compose([
                Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')
            ])],
            cardCvv: [null, Validators.compose([
                Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')
            ])]
        });

        this.getCurrency();
        this.userDetails = this.storage.retrieve('userDetails');
        this.usercardetails();
    }
    onNoClick(): void {
        this.activeModal.close();
    }
    usercardetails() {

        this.apiProvider.get('users/getcards/' + this.userDetails.id).subscribe(
            async resdata => {
                this.cardslist = resdata.result;
                this.getallcards();
            }, async (error) => {

            });

    }

    getallcards() {
        this.allcardlist = [];
        const cardsize = this.cardslist.length;
        let count = 0;
        this.cardslist.forEach((usercardmapping: any) => {
            if (usercardmapping.isdefault == true) {
                const transactiontoken = usercardmapping.transactionid;
                const fetchdata = {
                    transactionid: transactiontoken,
                };

                this.apiProvider.postNodeUrl('getbyVaultID', fetchdata).subscribe(
                    async resdata => {
                        console.log(resdata.customer_vault);
                        if (resdata.customer_vault == "") {
                        } else {
                            const ares: any = {
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

                            this.allcardlist.push(ares);

                            this.oncardForm.controls.cardNumber.setValue(resdata.customer_vault.customer.cc_number);
                            this.oncardForm.controls.expirationMonth.setValue(resdata.customer_vault.customer.cc_exp);
                            this.oncardForm.controls.cardFullName.setValue(resdata.customer_vault.customer.first_name
                                + ' ' + resdata.customer_vault.customer.last_name);
                            console.log(this.allcardlist);
                        }

                    }, async (error) => {

                    });

                count++;
            }
        });

    }

    async getCurrency() {

        this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
            async resdata => {
                this.currencies = resdata.result;
            }, async (error) => {

            });

    }

    getCurrencyName(cc) {
        const filterdata = this.currencies.filter(function (currency) {
            return currency.id == cc;
        });
        return filterdata[0].currency_code;
    }

    confirmClick(): void {
        this.activeModal.close(this.oncardForm);
    }
}
