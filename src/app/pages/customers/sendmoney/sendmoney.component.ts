import { Component, OnInit } from '@angular/core'
import { ApiProvider } from '@app/services/api-provider';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IpServiceService } from 'src/app/services/IpServiceService';
declare var swal: any;

@Component({
	selector: 'app-sendmoney',
	templateUrl: './sendmoney.component.html',
	styleUrls: ['./sendmoney.component.scss'],
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
export class SendMoneyComponent implements OnInit {

	sendMoneyForm: FormGroup;
	submitted = false;
	countrycode = 'PA';
	countries: Array<any>;
	states: Array<any>;
	cities: Array<any>;
	paymentmodes: Array<any>;
	currencies: Array<any>;
	recievercurrencies: Array<any>;
	payers: Array<any>;
	payerbranches: Array<any>;
	showbranchdetails = false;
	branchname = null;
	branchaddress = null;
	branchpayername = null;
	payerId = null;
	showbankdeposit = false;
	banks: Array<any>;
	sstates: Array<any>;
	scities: Array<any>;
	identifications: Array<any>;
	exchangerates: Array<any>;
	hastowns = false;
	towns: Array<any>;
	conversionrate = null;
	finalrate: any = {};
	receivercr = null;
	sendercr = null;
	taxpercentage = null;
	servicesfees = null;
	finalfees: any = 0;
	finaltax: any = 0;
	showbankbranchid = false;
	sendercurrencies: Array<any>;
	ipaddress = null;
	toDay: any = new Date().toJSON();
	creditlimit = null;
	itemsList: any = {};
	totalsendamount = 0;
	remittancepurpose: Array<any>;
	selectedcountry = null;
	onsearchForm: any;
	userObj: any;
	accounts: Array<any>;
	accountnumber = null;

	// tslint:disable-next-line:max-line-length
	baseUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAABjCAYAAAC1zlbPAAAACXBIWXMAAAsTAAALEwEAmpwYAAANRWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wMS0yMFQxNTowNjoxNC0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMi0xMFQxNjozNjowOC0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMTItMTBUMTY6MzY6MDgtMDU6MDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjE1ZmI5YTQtNWYxOC00MTBlLWE3NWMtM2Q0MTY1NGE2YmJiIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OWNjY2NjMmQtY2JiNC00NTQyLWI4YjItYTQ3MTgzZjhkMzliIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDEwMjg0ZjktMGZhOS0wYzRiLWE1MDYtNTQwYmY1ODY1NDAyIj4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+NUZDMzY4NzY1QkQyNzI3RDEyRjc0RjE0ODlCNjRENkQ8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MGY2NjIwMTEtNDZmZS04NDRiLWE1MDYtN2YxMWU0NjEyMDlhPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjEzMGNmOTI3LTE0NmEtMTFlYS1iNDI4LWRjZDZkMTlhOWEzMjwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ODFkN2Q3Mi0xNDZjLTExZWEtYjQyOC1kY2Q2ZDE5YTlhMzI8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6NjYwOWFlYjEtNzA1My1kOTQwLWIwNTgtZTUzMjFjYzhkNzliPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoxOTJENDhCMjg5ODcxMUU3ODFBQkE4Nzc2RkQ0MTZCNzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6Nzg4QTJBMjZEMDI1MTFFN0EwQUVDODc5QjYyQkFCMUQ8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkZGMkRBOUZDQTZGREU5MTE5QTRGQkU5OEFGNEFEQjI5PC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpkMTAyODRmOS0wZmE5LTBjNGItYTUwNi01NDBiZjU4NjU0MDI8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOmZjMGY3ZDY5LTVhMGQtZjk0NC1hNWYwLWU5OGE4MjFkZWUxYTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQxMDI4NGY5LTBmYTktMGM0Yi1hNTA2LTU0MGJmNTg2NTQwMiIgc3RFdnQ6d2hlbj0iMjAxOC0wMS0yMFQxNTowNjoxNC0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ODBhNjQxNy00N2M0LTJlNDctYTk4Mi0zOWM5ZmJlOGZkOTciIHN0RXZ0OndoZW49IjIwMTgtMDEtMjNUMTk6MTg6MjItMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGVmNzRlYWItOWQyOC00ZWRhLTg5ZjYtZTMyZTcwZGM2ODBlIiBzdEV2dDp3aGVuPSIyMDE5LTEyLTEwVDE2OjE1OjUzLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZmEyMGRkZjItYTI1NS00OTY2LTkzNDItMTYxMTYzYWRmNzRiIiBzdEV2dDp3aGVuPSIyMDE5LTEyLTEwVDE2OjE1OjUzLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjE1ZmI5YTQtNWYxOC00MTBlLWE3NWMtM2Q0MTY1NGE2YmJiIiBzdEV2dDp3aGVuPSIyMDE5LTEyLTEwVDE2OjM2OjA4LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGVmNzRlYWItOWQyOC00ZWRhLTg5ZjYtZTMyZTcwZGM2ODBlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzdhZDUyOTItMTg5ZC0xNjQyLTk2ZWQtMTQyYjlmN2NiNjY3IiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDEwMjg0ZjktMGZhOS0wYzRiLWE1MDYtNTQwYmY1ODY1NDAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6g1srgAAObNJREFUeJztnXecFOX5wL8zW64XOOA4mhRpgggCghRFiqhIbLHEStQkRhNr7MYUY4m9Jiaxx/6zS+wiiAVRQOmCdI52d1xvW2Z+fzy73N7e7N7uzmw52O/nMx+42Snvlnmf9+mKruukSZMmTZo00aImewBp0qRJk6ZjYgdwHn59sseRZj9G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';

	pdfDocGenerator: any;
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private apiProvider: ApiProvider,
		private storage: LocalStorageService,
		private notification: NzNotificationService,
		private ip: IpServiceService,
		private spinner: NgxSpinnerService
	) {
		this.creditlimit = 1000;

		this.userObj = this.storage.retrieve('userDetails');

		this.getcurrency();
		this.getIP();

		this.countrycode = this.storage.retrieve('basecountrycode');
		this.sendMoneyForm = this.formBuilder.group({
			searchParam: ['OTHER', Validators.compose([
				Validators.required
			])],
			senderamount: [null, Validators.compose([
				Validators.required,
			])],
			receiveramount: [null, Validators.compose([
				Validators.required,
			])],
			countryid: [null, Validators.compose([
				Validators.required,
			])],
			stateid: [null, Validators.compose([
				Validators.required
			])],
			cityid: [null, Validators.compose([
				Validators.required
			])],
			townid: [null, Validators.compose([])],
			paymentmode: [null, Validators.compose([
				Validators.required
			])],
			sendcurrency: [null, Validators.compose([
				Validators.required
			])],
			recievecurrency: [null, Validators.compose([
				Validators.required
			])],
			payername: [null, Validators.compose([])],
			payerbranch: [null, Validators.compose([])],
			rcountryid: [null, Validators.compose([])],
			rcityid: [null, Validators.compose([])],
			rtownid: [null, Validators.compose([])],
			rstateid: [null, Validators.compose([])],
			firstname: [null, Validators.compose([
				Validators.required
			])],
			middlename: [null, Validators.compose([])],
			lastname: [null, Validators.compose([
				Validators.required
			])],
			bankname: [null, Validators.compose([])],
			bankbranchid: [null, Validators.compose([])],
			accountnumber: [null, Validators.compose([])],
			accountype: [null, Validators.compose([])],
			postalcode: [null, Validators.compose([])],
			receiveraddress: [null, Validators.compose([])],
			mobilenumber: [null, Validators.compose([
				Validators.required
			])],
			email: [null, Validators.compose([])],
			workphone: [null, Validators.compose([])],
			homephone: [null, Validators.compose([])],
			nationality: [null, Validators.compose([])],
			description: [null, Validators.compose([])],
			senderfullname: [null, Validators.compose([
				Validators.required
			])],
			loyaltycardnumber: [null, Validators.compose([])],
			senderdob: [null, Validators.compose([])],
			senderaddress: [null, Validators.compose([])],
			scountryid: [null, Validators.compose([
				Validators.required
			])],
			sstateid: [null, Validators.compose([])],
			scityid: [null, Validators.compose([])],
			spostalcode: [null, Validators.compose([])],
			sendermobilenumber: [null, Validators.compose([
				Validators.required
			])],
			senderemail: [null, Validators.compose([])],
			senderworkphone: [null, Validators.compose([])],
			senderhomephone: [null, Validators.compose([])],
			sendernationality: [null, Validators.compose([])],
			identification: [null, Validators.compose([])],
			identificationnumber: [null, Validators.compose([])],
			expirydate: [null, Validators.compose([])],
			purposeremittance: [null, Validators.compose([])],
			senderdateofbirth: [null, Validators.compose([
				Validators.required
			])]
		});

	}

	getIP() {
		this.ip.getIPAddress().subscribe((res: any) => {
			this.ipaddress = res.ip;
		});
	}

	navigateTransfers() {
		if (this.sendMoneyForm.value.searchParam == 'COOP') {
			this.router.navigate(['/coopmoney']);
		}
	}

	latestUserDetails() {
		const mobileno = this.userObj.mobilenumber;
		const areacode = this.userObj.phonecode;
		const usertype = this.userObj.usertype;

		this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + usertype).subscribe(
			async resdata => {
				this.accounts = [];
				resdata.result.customerdetails.customeraccount.forEach(items => {
					let item: any = {};
					const currencyid = items.currencyid;

					const filterdata1 = this.sendercurrencies.filter(function (currency) {
						return currency.id == currencyid;
					});

					item = {
						accountnumber: items.accountnumber,
						currentbalance: items.currentbalance,
						currencycode: filterdata1[0].currency_code,
						displayname: items.accountnumber + '-' + filterdata1[0].currency_code
					};
					this.accounts.push(item);
				});
			}, async () => {
			});
	}

	ngOnInit() {
	}

	getcurrency() {
		const inputdata = {
			username: 'customerapp',
			// password: 'welcome',
			grant_type: 'password'
		};
		this.apiProvider.loginCashsends('oauth/token', inputdata).subscribe(
			async tokendata => {
				this.storage.store('cashsends_access_token', tokendata.access_token);
				this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
					async resdata => {
						this.sendercurrencies = resdata.result;
						this.getCountry();
						this.latestUserDetails();
					}, async () => {
					});
			}, async () => {
				this.notification.error('Error', 'Some thing went wrong please try after sometime or contact admin');
				this.spinner.hide();
			});
	}

	getCurrencyName(cc) {
		const filterdata = this.currencies.filter(function (currency) {
			return currency.id == cc;
		});
		return filterdata[0].currency_code;
	}

	getRemittancepurpose() {
		this.selectedcountry = this.sendMoneyForm.value.countryid;
		if (this.selectedcountry == 'IN') {
			const fetchdata: any = {
				size: 0,
				params: this.sendMoneyForm.value.countryid,
				type: 'REMITTANCE_PURPOSE',
				basecode: this.countrycode
			};

			this.remittancepurpose = [];

			this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
				async resdata => {
					const result = JSON.parse(resdata.result.result);
					this.remittancepurpose = result.RemittancePurposes;
				}, async () => {
				});
		}
	}

	getCountry() {
		const fetchdata: any = {
			size: 0,
			params: '',
			type: 'COUNTRY',
			basecode: this.countrycode
		};

		this.countries = [];

		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.countries = result.Countries;
			}, async () => {
			});
	}

	getexchangeRates() {
		const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.sendcurrency.split('|')[0];
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'EXCHANGE_RATES',
			basecode: this.countrycode
		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
			}, async () => {
			});
	}

	getStates() {
		this.countrycode = this.sendMoneyForm.value.countryid;
		this.getRemittancepurpose();
		// this.sendMoneyForm.controls.rcountryid.setValue(this.sendMoneyForm.value.countryid);
		// this.sendMoneyForm.controls.stateid.setValue(null);
		// this.sendMoneyForm.controls.cityid.setValue(null);
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		this.cities = [];
		const countryid = this.sendMoneyForm.value.countryid;
		const filterdata = this.countries.filter(function (country) {
			return country.IsoCode == countryid;
		});
		if (filterdata[0].HasTown == 'A') {
			this.hastowns = true;
		} else {
			this.hastowns = false;
		}

		const fetchdata: any = {
			size: 1,
			params: this.sendMoneyForm.value.countryid,
			type: 'STATE',
			basecode: this.countrycode

		};
		this.states = [];
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.states = result.States;
			}, async () => {
			});
	}

	getCity() {
		// this.sendMoneyForm.controls.rstateid.setValue(this.sendMoneyForm.value.stateid);
		this.sendMoneyForm.controls.cityid.setValue(null);
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		this.cities = [];
		const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.stateid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'CITY',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.cities = result.Cities;
			}, async () => {
			});
	}

	getPaymentMode() {
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		if (!this.hastowns) {
			this.showbranchdetails = false;
			this.sendMoneyForm.controls.rcityid.setValue(this.sendMoneyForm.value.cityid);
			const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.cityid;
			const fetchdata: any = {
				size: 2,
				params: paramdata,
				type: 'PAYMENT_MODES',
				basecode: this.countrycode

			};
			this.paymentmodes = [];
			this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
				async resdata => {
					const result = JSON.parse(resdata.result.result);
					this.paymentmodes = result.PaymentModes;
				}, async () => {
				});
		} else {
			this.gettowns();
		}
	}

	getrecieverCurrencyCode() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		this.payers = [];
		this.payerbranches = [];
		const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.stateid + '|' +
			+ this.sendMoneyForm.value.cityid + '|' + this.sendMoneyForm.value.paymentmode;


		if (this.sendMoneyForm.value.paymentmode == 'C') {
			this.showbankdeposit = true;
			this.getBank();
		} else {
			this.showbankdeposit = false;
			this.sendMoneyForm.controls.bankname.setValue(null);
			this.banks = [];
		}

		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'RECIEVER_CURRENCY',
			basecode: this.countrycode
		};

		this.currencies = [];

		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.currencies = result.Currencies;
			}, async () => {
			});
	}

	getPayer() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		this.accountnumber = this.sendMoneyForm.value.sendcurrency.split('|')[1];
		const accountnumber = this.sendMoneyForm.value.sendcurrency.split('|')[1];
		const filterdata = this.accounts.filter(function (accounts) {
			return accounts.accountnumber == accountnumber;
		});

		this.creditlimit = filterdata[0].currentbalance;
		if (!this.hastowns) {
			const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.cityid + '|'
				+ this.sendMoneyForm.value.paymentmode + '|' + this.sendMoneyForm.value.recievecurrency + '|'
				+ this.sendMoneyForm.value.sendcurrency.split('|')[0];

			const fetchdata: any = {
				size: 2,
				params: paramdata,
				type: 'PAYER',
				basecode: this.countrycode
			};

			this.payers = [];
			this.payerbranches = [];
			this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
				async resdata => {
					const result = JSON.parse(resdata.result.result);
					this.payers = result.MasterPayerResults;
					console.log(this.payers);
					// this.paymentmodes =
				}, async () => {
				});
		} else {
			this.getPayerbyTowns();
		}
	}

	getPayerbyTowns() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		this.sendMoneyForm.controls.rtownid.setValue(this.sendMoneyForm.value.townid);
		const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.cityid + '|'
			+ this.sendMoneyForm.value.paymentmode + '|' + this.sendMoneyForm.value.sendcurrency.split('|')[0] + '|'
			+ this.sendMoneyForm.value.recievecurrency + '|' + this.sendMoneyForm.value.townid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'PAYER_BY_TOWN',
			basecode: this.countrycode

		};
		this.payers = [];
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.payers = result.MasterPayerResults;
				console.log(this.payers);
				// this.paymentmodes =
			}, async () => {
			});

	}

	resetsendamount() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
	}

	getpayermodesTown() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
		this.showbranchdetails = false;
		this.sendMoneyForm.controls.rcityid.setValue(this.sendMoneyForm.value.cityid);
		const paramdata = this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.cityid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'PAYMENT_MODES',
			basecode: this.countrycode
		};
		this.paymentmodes = [];
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.paymentmodes = result.PaymentModes;
			}, async () => {
			});

	}

	gettowns() {
		const paramdata = this.sendMoneyForm.value.cityid + '|'
			+ this.sendMoneyForm.value.countryid + '|' + this.sendMoneyForm.value.stateid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'TOWN',
			basecode: this.countrycode
		};
		this.towns = [];
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.towns = result.Towns;
			}, async () => {
			});
	}

	getBank() {
		if (this.sendMoneyForm.value.countryid == 'IN') {
			this.showbankbranchid = true;
		} else {
			this.showbankbranchid = false;
			this.sendMoneyForm.controls.bankbranchid.setValue(null);
		}
		const paramdata = this.sendMoneyForm.value.countryid;
		const fetchdata: any = {
			size: 1,
			params: paramdata,
			type: 'BANKS',
			basecode: this.countrycode
		};
		this.banks = [];
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.banks = result.Banks;
				console.log(result);
				// this.paymentmodes =
			}, async (error) => {

			});
	}

	getpayerbranch() {
		this.sendMoneyForm.controls.payerbranch.setValue(null);
		this.payerbranches = [];
		const payercode = this.sendMoneyForm.value.payername;
		const filterdata = this.payers.filter(function (payer) {
			return payer.PayerInternalCode == payercode;
		});
		this.payerbranches = filterdata[0].PayerDetailsResults;
	}

	branchdetails() {
		this.showbranchdetails = true;
		const branchId = this.sendMoneyForm.value.payerbranch;
		const filterdata = this.payerbranches.filter(function (payer) {
			return payer.BranchId == branchId;
		});
		this.branchname = filterdata[0].BranchName;
		this.branchaddress = filterdata[0].BranchAddress;
		this.branchpayername = filterdata[0].PayerName;
		this.payerId = filterdata[0].PayerId;
		this.conversionrate = filterdata[0].CustomerRate;


	}

	getCountry1() {
		const fetchdata: any = {
			size: 0,
			params: '',
			type: 'COUNTRY',
			basecode: this.countrycode

		};

		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.countries = result.Countries;
			}, async (error) => {

			});
	}

	getStates1() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.sendMoneyForm.controls.countryid.setValue(this.sendMoneyForm.value.rcountryid);
		this.showbranchdetails = false;
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.payername.setValue(null);
		this.sendMoneyForm.controls.payerbranch.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		const fetchdata: any = {
			size: 1,
			params: this.sendMoneyForm.value.rcountryid,
			type: 'STATE',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.states = result.States;
			}, async () => {
			});
	}

	getCity1() {
		this.sendMoneyForm.controls.stateid.setValue(this.sendMoneyForm.value.rstateid);
		this.showbranchdetails = false;
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.payername.setValue(null);
		this.sendMoneyForm.controls.payerbranch.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		const paramdata = this.sendMoneyForm.value.countryid + '|'
			+ this.sendMoneyForm.value.stateid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'CITY',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.cities = result.Cities;
			}, async () => {
			});
	}

	getPaymentMode1() {
		this.showbranchdetails = false;
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.payername.setValue(null);
		this.sendMoneyForm.controls.payerbranch.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		this.sendMoneyForm.controls.cityid.setValue(this.sendMoneyForm.value.rcityid);
		const paramdata = this.sendMoneyForm.value.countryid + '|' +
			this.sendMoneyForm.value.cityid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'PAYMENT_MODES',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.paymentmodes = result.PaymentModes;
				console.log(this.paymentmodes);
			}, async (error) => {

			});
	}

	getPaymentMode2() {
		this.showbranchdetails = false;
		this.sendMoneyForm.controls.paymentmode.setValue(null);
		this.sendMoneyForm.controls.payername.setValue(null);
		this.sendMoneyForm.controls.payerbranch.setValue(null);
		this.sendMoneyForm.controls.recievecurrency.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		this.sendMoneyForm.controls.townid.setValue(this.sendMoneyForm.value.rtownid);
		const paramdata = this.sendMoneyForm.value.countryid + '|' +
			this.sendMoneyForm.value.cityid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'PAYMENT_MODES',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.paymentmodes = result.PaymentModes;
				console.log(this.paymentmodes);
			}, async (error) => {

			});
	}


	getStates2() {
		const fetchdata: any = {
			size: 1,
			params: this.sendMoneyForm.value.scountryid,
			type: 'STATE',
			basecode: this.countrycode
		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.sstates = result.States;
				this.getIdentificationtypes();
			}, async () => {
			});
	}

	getIdentificationtypes() {
		const fetchdata: any = {
			size: 1,
			params: this.sendMoneyForm.value.scountryid,
			type: 'SENDER_TYPE_ID',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.identifications = result.SenderTypeOfIds;
				console.log(result);
			}, async () => {
			});
	}

	getCity2() {
		const paramdata = this.sendMoneyForm.value.scountryid + '|' +
			this.sendMoneyForm.value.sstateid;
		const fetchdata: any = {
			size: 2,
			params: paramdata,
			type: 'CITY',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				this.scities = result.Cities;
			}, async (error) => {

			});
	}

	clearsend() {
		this.sendMoneyForm.controls.senderamount.setValue(null);
		this.sendMoneyForm.controls.receiveramount.setValue(null);
		this.payers = [];
		this.payerbranches = [];
		this.finaltax = 0;
		this.finalfees = 0;
		this.finalrate = {};
	}

	saveTransaction() {
		if (this.finalfees == 0) {
			this.notification.warning('Warning', 'You cannot perform the transaction as service fees is not configured.Please contact admin');
		} else if (parseFloat(this.finalfees) > parseFloat(this.creditlimit)) {
			this.notification.warning('Warning', 'Your account dosent have sufficient funds to transfer, Please fund your wallet to send money');
		} else {
			this.spinner.show();
			const finalamount = parseFloat(this.finalrate.SentAmount) + this.finalfees + this.finaltax;
			const scityid = this.sendMoneyForm.value.scityid;
			const fetchdata: any = {
				Sender: {
					SenderId: '',
					LoyaltyCardNumber: this.sendMoneyForm.value.loyaltycardnumber,
					Name: this.sendMoneyForm.value.senderfullname,
					NameOtherLanguage: '',
					Address: this.sendMoneyForm.value.senderaddress,
					AddressOtherLanguage: '',
					ZipCode: this.sendMoneyForm.value.spostalcode,
					PhoneHome: this.sendMoneyForm.value.senderhomephone,
					PhoneWork: this.sendMoneyForm.value.senderworkphone,
					PhoneMobile: this.sendMoneyForm.value.sendermobilenumber,
					IsIndividual: true,
					CountryIsoCode: this.sendMoneyForm.value.scountryid,
					StateId: this.sendMoneyForm.value.sstateid,
					// tslint:disable-next-line:radix
					CityId: parseInt(scityid),
					NationalityIsoCode: this.sendMoneyForm.value.sendernationality,
					Email: this.sendMoneyForm.value.senderemail,
					TypeOfId: this.sendMoneyForm.value.identification,
					IdNumber: this.sendMoneyForm.value.identificationnumber,
					IdExpiryDate: this.sendMoneyForm.value.expirydate,
					DateOfBirth: this.sendMoneyForm.value.senderdateofbirth + 'T' + '00:00:00',
					SenderDateOfBirth: this.sendMoneyForm.value.senderdateofbirth + 'T' + '00:00:00',
				},
				Receiver: {
					FirstName: this.sendMoneyForm.value.firstname,
					FirstNameOtherLanguage: '',
					LastName: this.sendMoneyForm.value.lastname,
					LastNameOtherLanguage: '',
					SecondName: this.sendMoneyForm.value.middlename,
					SecondNameOtherLanguage: '',
					SecondLastName: '',
					SecondLastNameOtherLanguage: '',
					CompleteAddress: this.sendMoneyForm.value.receiveraddress,
					CompleteAddressOtherLanguage: '',
					StateId: this.sendMoneyForm.value.rstateid,
					// tslint:disable-next-line:radix
					CityId: parseInt(this.sendMoneyForm.value.rcityid),
					TownId: this.sendMoneyForm.value.rtownid,
					CountryIsoCode: this.sendMoneyForm.value.rcountryid,
					MobilePhone: this.sendMoneyForm.value.mobilenumber,
					HomePhone: this.sendMoneyForm.value.homephone,
					WorkPhone: this.sendMoneyForm.value.workphone,
					ZipCode: this.sendMoneyForm.value.postalcode,
					NationalityIsoCode: this.sendMoneyForm.value.nationality,
					IsIndividual: '',
					Cpf: '',
					Notes: '',
					NotesOtherLanguage: ''
				},
				TransactionInfo: {
					PaymentModeId: this.sendMoneyForm.value.paymentmode,
					ReceiveCurrencyIsoCode: this.sendMoneyForm.value.recievecurrency,
					BankId: this.sendMoneyForm.value.bankname,
					Account: this.sendMoneyForm.value.accountnumber,
					AccountTypeId: this.sendMoneyForm.value.accountype,
					BankBranchId: this.sendMoneyForm.value.bankbranchid,
					SwiftCode: '',
					PayingBranchId: this.sendMoneyForm.value.payerbranch,
					PayerId: this.payerId,
					PurposeOfRemittanceId: this.sendMoneyForm.value.purposeremittance,
					Rate: this.finalrate.TransactionRate,
					TotalSentAmount: this.finalrate.TotalSentAmount,
					SentAmount: this.finalrate.SentAmount,
					ServiceFee: this.finalfees,
					USDServiceFee: this.finalrate.USDServiceFee,
					ReceiveAmount: this.finalrate.ReceiveAmount,
					CashAmount: finalamount,
					Payout: this.finalrate.Payout,
					ApprovalCode: '',
					FormOfPaymentId: '',
					SourceCurrencyIsoCode: this.sendMoneyForm.value.sendcurrency.split('|')[0],
					tax: this.finaltax,
					RemittanceId: this.sendMoneyForm.value.purposeremittance
				},
				Compliance: {
					DateOfBirth: this.sendMoneyForm.value.senderdateofbirth + 'T' + '00:00:00',
					SenderDateOfBirth: this.sendMoneyForm.value.senderdateofbirth + 'T' + '00:00:00',
					CountryIssueIsoCode: this.sendMoneyForm.value.countryid,
					StateIssueId: 'PAN',
					ReceiverRelationship: '',
					SourceOfFunds: '',
					Ssn: '',
					SenderOccupation: '',
					SenderEmployerName: '',
					SenderEmployerAddress: '',
					SenderEmployerPhone: '',
					ReceiverDateOfBirth: '',
					ReceiverFullName: this.sendMoneyForm.value.firstname + ' ' + this.sendMoneyForm.value.lastname
				},
				SenderId: 145,
				ReceiverId: '',
				UserIds: this.userObj.id,
				basecode: this.countrycode,
				servicefees: this.finalfees,
				taxamount: this.finaltax,
				ipaddress: this.ipaddress,
				transactiontype: 'CUSTOMERTRANSFER',
				accountnumber: this.accountnumber,
				areacode: this.userObj.phonecode,
				phonenumber: this.userObj.mobilenumber
			};

			this.apiProvider.get('wallet/sendmoney/' + this.accountnumber + '/ ' + this.totalsendamount +
				'/ ' + this.userObj.id + '/' + this.sendMoneyForm.value.sendcurrency.split('|')[0] + ' ').subscribe(
					async respdata => {
						if (respdata.result == 'FAILED') {
							this.notification.error('Error', 'Failed to send money.Please try after some time');
						} else if (respdata.result == 'INVALID_BALANCE') {
							this.notification.warning('Warning', 'Your account dosent have sufficient balance.Please add fund to your wallet');

						} else if (respdata.result == 'SUCCESS') {

							this.apiProvider.postCashSends('transaction/customersendmoney', fetchdata).subscribe(
								async resdata => {
									this.spinner.hide();
									console.log(resdata.result);
									// const resp = resdata.result.split('|');
									// console.log(resp[0]);
									if (resdata.result != 'FAILED') {

										swal({
											type: 'success',
											text: 'Transaction generated successfully,You will be recieving the confirmation pin  post approval',
											showCancelButton: true,
											confirmButtonColor: '#049F0C',
											cancelButtonColor: '#ADD8E6',
											confirmButtonText: 'Confirm',
											cancelButtonText: 'Ok'
										}).then(() => {
											this.finalrate = {};
											this.finalfees = null;
											this.sendercr = null;
											this.finaltax = null;
											this.totalsendamount = null;

											this.sendMoneyForm.reset();
										}, (dismiss) => {
											// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
											if (dismiss == 'cancel') {
												this.finalrate = {};
												this.finalfees = null;
												this.sendercr = null;
												this.finaltax = null;
												this.totalsendamount = null;

												this.sendMoneyForm.reset();
											}
										});
									} else {
										this.notification.error('Error', 'Failed to send money.Please try after some time');
									}
								}, async (error) => {
									this.notification.error('Error', 'Failed to send money.Please try after some time');
								});
						}
					}, async (error) => {
						this.notification.error('Error', 'Failed to send money.Please try after some time');
					});

		}
	}

	getrecieveramount() {
		if (this.sendMoneyForm.value.scountryid == null) {
			this.notification.warning('Warning', 'Please select sender country');
			this.sendMoneyForm.controls.senderamount.setValue(null);
		} else {
			let paramdata = '';
			let type = '';
			if (this.sendMoneyForm.value.paymentmode == 'C') {
				if (this.sendMoneyForm.value.countryid == 'IN') {
					paramdata = this.sendMoneyForm.value.countryid + '|'
						+ this.sendMoneyForm.value.cityid + '|'
						+ this.sendMoneyForm.value.paymentmode + '|'
						+ this.sendMoneyForm.value.recievecurrency + '|'
						+ this.sendMoneyForm.value.sendcurrency.split('|')[0] + '|'
						+ this.sendMoneyForm.value.senderamount + '|'
						+ this.sendMoneyForm.value.bankname + '|';
					type = 'FINAL_BANK_FEES_IN';
				} else {
					paramdata = this.sendMoneyForm.value.countryid + '|'
						+ this.sendMoneyForm.value.cityid + '|'
						+ this.payerId + '|'
						+ this.sendMoneyForm.value.paymentmode + '|'
						+ this.sendMoneyForm.value.recievecurrency + '|'
						+ this.sendMoneyForm.value.sendcurrency.split('|')[0] + '|'
						+ this.sendMoneyForm.value.payerbranch + '|'
						+ this.sendMoneyForm.value.senderamount + '|'
						+ this.sendMoneyForm.value.bankname + '|';
					type = 'FINAL_BANK_FEES';
				}
			} else {
				paramdata = this.sendMoneyForm.value.countryid + '|'
					+ this.sendMoneyForm.value.cityid + '|'
					+ this.payerId + '|'
					+ this.sendMoneyForm.value.paymentmode + '|'
					+ this.sendMoneyForm.value.recievecurrency + '|'
					+ this.sendMoneyForm.value.sendcurrency.split('|')[0] + '|'
					+ this.sendMoneyForm.value.payerbranch + '|'
					+ this.sendMoneyForm.value.senderamount + '|'
					+ this.conversionrate + '|';
				type = 'FINAL_SERVICE_FEES';
			}
			this.spinner.show();
			const fetchdata: any = {
				size: 2,
				params: paramdata,
				type,
				basecode: this.countrycode
			};
			this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
				async resdata => {
					this.apiProvider.getCashSends('configuration/taxesforcountry/' + this.countrycode + '').subscribe(
						async taxdata => {
							if (taxdata.result != null) {
								this.taxpercentage = taxdata.result;
								this.spinner.hide();
								const result = JSON.parse(resdata.result.result);
								this.finalrate = result;
								const servicefees = result.SentAmount;
								let paymentmode = 'CASH PICKUP';
								if (this.sendMoneyForm.value.paymentmode == 'C') {
									paymentmode = 'BANK DEPOSIT';
								}
								const servicedata: any = {
									partnertype: 'TRANSFAST',
									transactiontype: 'SEND TRANSFER',
									paymentmode,
									sendercountry: this.sendMoneyForm.value.scountryid,
									recievercountry: this.sendMoneyForm.value.countryid,
									currencycode: this.sendMoneyForm.value.sendcurrency.split('|')[0],
									amount: result.SentAmount
								};
								this.apiProvider.postCashSends('configuration/servicerate', servicedata).subscribe(
									async servicesdata => {
										if (servicesdata.result.id != null) {
											const sentamount = result.SentAmount;
											let fees = 0;
											if (servicesdata.result.id != null) {
												const flatamount = servicesdata.result.flatrate;
												const percentage = servicesdata.result.percentagevalue;
												if (servicesdata.result.servicetype == 'PERCENTAGERATE') {
													fees = parseFloat(((percentage / 100) * sentamount).toFixed(2));
												} else if (servicesdata.result.servicetype == 'FLATRATE') {
													fees = parseFloat(flatamount);
												} else {
													const fees1 = parseFloat(((percentage / 100) * sentamount).toFixed(2));
													const fees2 = parseFloat(flatamount);
													fees = fees1 + fees2;
												}
												this.finalfees = fees;
											} else {
												this.finalfees = 0;
											}
											if (this.taxpercentage != null) {
												this.finaltax = parseFloat(((this.taxpercentage.taxvalue / 100) * this.finalfees).toFixed(2));
											}
											this.sendMoneyForm.controls.receiveramount.setValue(result.ReceiveAmount);
											this.sendMoneyForm.controls.receiveramount.disable();
											this.receivercr = this.sendMoneyForm.value.recievecurrency;
											this.sendercr = this.sendMoneyForm.value.sendcurrency.split('|')[0];
											this.totalsendamount = this.finalfees + sentamount + this.finaltax;
										} else {
											this.servicesfees = 0;
											this.finalfees = 0;
											this.spinner.hide();
											this.notification.warning('Warning', 'Service fees are not configured');
										}
									}, async (error) => {
										this.spinner.hide();
									});
							} else {
								this.servicesfees = 0;
								this.finalfees = 0;
								this.spinner.hide();
								this.notification.warning('Warning', 'Taxes are not configured');
							}
						}, async () => {
							this.spinner.hide();
						});
				}, async (error) => {
					const errorresp = JSON.parse(error._body);
					const mesg = errorresp.message.split('Request:');
					const businesserrors = JSON.parse(mesg[1]);
					if (businesserrors.length > 0) {
						this.notification.warning('Warning', businesserrors[0].BusinessErrors[0].Message);
					}
					this.spinner.hide();
				});
		}
	}

	getdetails(tfpin) {
		const fetchdata: any = {
			size: 2,
			params: tfpin,
			type: 'GET_TRANSACTION',
			basecode: this.countrycode

		};
		this.apiProvider.postCashSends('configuration/transfastmasters', fetchdata).subscribe(
			async resdata => {
				const result = JSON.parse(resdata.result.result);
				// console.log(result);
				const totalsendamount = parseFloat(result.TransactionInfo.SentAmount) + parseFloat(this.finalfees) + parseFloat(this.finaltax);
				this.itemsList = {
					qrtText: 'Cash Sends',
					hNum: 'R.U.C:8-NT-2-41529',
					calleQuinta: 'Calle Quinta y Manuel Gonzalez',
					deltext: 'Del Edifcio Aitza,Local 1,',
					cityText: 'Santiago Veraguas,',
					republicText: 'Republic of Panama',
					email: 'support@cooptavanza.com',
					panamaNum: 'Panama +5079334499',
					usaNum: 'USA 18184852558',
					ukNum: 'UK +44020 3287 7700',
					refText: 'Reference PIN: ',
					refPin: result.TfPin,
					senderText: 'Sender: ',
					senderval: result.Sender.Name,
					originText: 'Origin: ',
					originVal: result.Sender.CountryName,
					receivertext: 'Receiver: ',
					receiverVal: result.Receiver.FullName,
					destinationText: 'Destination: ',
					destinationVal: result.Receiver.CountryName,
					receiviningAmountText: 'Receiving Amount: ',
					receiviningAmountVal: result.TransactionInfo.ReceiveCurrencyIsoCode + ' ' + (result.TransactionInfo.ReceiveAmount).toFixed(2),
					sendAmountText: 'Send Amount',
					sendAmountVal: result.TransactionInfo.SourceCurrencyIsoCode + ' ' + (result.TransactionInfo.SentAmount).toFixed(2),
					serviceFeeText: 'Service Fee',
					serviceVal: this.finalfees,
					taxText: 'Tax',
					taxVal: this.finaltax,
					totalVal: totalsendamount
				};
				this.printreceipt();
				console.log(result);
			}, async () => {
			});
	}

	printreceipt() {
		this.finalrate = {};
		this.finalfees = null;
		this.sendercr = null;
		this.finaltax = null;
		this.totalsendamount = null;
		const documentDefinition = this.getDocumentDefinition();
		// this.pdfDocGenerator = pdfMake.createPdf(documentDefinition);

		this.pdfDocGenerator.getDataUrl((dataUrl) => {
			const targetElement = document.querySelector('#iframeContainer');
			if (targetElement.childNodes.length) {
				targetElement.removeChild(targetElement.childNodes[0]);
			}
			const iframe = document.createElement('iframe');
			iframe.style.width = '80%';
			iframe.style.height = '600px';
			iframe.src = dataUrl;
			// console.log('artttttt', dataUrl, targetElement);
			targetElement.appendChild(iframe);

		});

	}

	getDocumentDefinition() {
		// let fileReader = new FileReader();
		// const img = document.getElementById('imageId');
		// const fileUrl = fileReader.readAsDataURL(img);
		console.log(this.itemsList);
		return {
			content: [
				{
					text: '1/2/2020',
					fontSize: 12,
					alignment: 'left',
					margin: [-20, 0, 0, 20]
				}, {
					margin: [0, 0, 0, 0],
					columns: [
						[
							[{
								image: this.baseUrl,
								alignment: 'left',
								width: 100,
								height: 30
							}], [{
								text: 'Invoice #',
								alignment: 'right',
								fontSize: 8,
								margin: [0, -30, 0, 0]
							}, {
								text: 'Jan 02, 2020',
								alignment: 'right',
								fontSize: 8
							}]
						]
					]
				},
				this.getOfficeAddressDetails(),
				{
					text: `${this.itemsList.refText}${this.itemsList.refPin}`,
					fontSize: 9,
					bold: true,
					margin: [0, 5, 0, 0]
				},
				{
					canvas: [
						{
							type: 'line',
							x1: 0,
							y1: 0,
							x2: 535,
							y2: 0,
							lineWidth: 0.5,
							lineColor: '#BDBDBD'
						}
					]
				},
				this.senderDetails(),
				{
					columns: [[{
						text: this.itemsList.sendAmountText,
						fontSize: 9,
						bold: true
					}], [{
						text: `${this.itemsList.sendAmountVal}`,
						fontSize: 9,
						bold: true,
						alignment: 'right',
						margin: [0, 3, 0, 0]
					}]]
				},
				{
					canvas: [
						{
							type: 'line',
							x1: 0,
							y1: 0,
							x2: 535,
							y2: 0,
							lineWidth: 0.5,
							lineColor: '#BDBDBD'
						}
					]
				},
				{
					columns: [[{
						text: this.itemsList.serviceFeeText,
						fontSize: 8
					}], [{
						text: `USD ${this.itemsList.serviceVal}`,
						fontSize: 8,
						alignment: 'right'
					}]]
				}, {
					canvas: [
						{
							type: 'line',
							x1: 0,
							y1: 0,
							x2: 535,
							y2: 0,
							lineWidth: 0.5,
							lineColor: '#BDBDBD'
						}
					]
				},
				{
					columns: [[{
						text: this.itemsList.taxText,
						fontSize: 8
					}], [{
						text: `USD ${this.itemsList.taxVal}`,
						fontSize: 8,
						alignment: 'right'
					}]]
				}, {
					canvas: [
						{
							type: 'line',
							x1: 0,
							y1: 0,
							x2: 535,
							y2: 0,
							lineWidth: 0.5,
							lineColor: '#BDBDBD'
						}
					]
				},
				{
					text: `Total: USD ${this.itemsList.totalVal}`,
					bold: true,
					fontSize: 8,
					alignment: 'right'
				},
				{
					// tslint:disable-next-line:max-line-length
					text: `FEES and CHARGES Service/Transaction Fee You agree to pay COOPTAVANZA R.L. a service fee (the "Service Fee") for each transaction submitted for processing by you, plus any additional charges that may apply to the Transaction, plus the amount of money to be sent to the person receiving the funds ("Beneficiary"). Please be advised that if using a credit card, the issuing bank may charge you additional cash advance fees, COOPTAVANZA R.L. shall not liable to reimburse you for. Payment of Transfer Payment is due at the time you submit a transaction to COOPTAVANZA R.L.. We only accept payment in U.S. Dollars and Canadian Dollars. Non-Sufficient Funds In the event that you submit a transaction for which COOPTAVANZA R.L. incurs “NSF” (Non-Sufficient Funds) charges, chargeback fees, or other similar expenses, you agree to reimburse COOPTAVANZA R.L. for all and any such fees, charges and expenses. Each occurrence of an NSF will result in a $35.00 (USD) “NSF Fee”. Fees due to us can be collected when incurred, or may be deducted from the principle amount of your next or future transaction. COOPTAVANZA R.L. reserves the right to collect NSF Fees from any of the Payment Instruments (which may include one or more bank account, credit card and/or debit card) that you have linked to your COOPTAVANZA R.L..com account, in accordance with this Agreement. Transfer Amount Adjustment In cases where transactions are funded from the sender's ("Remitter's") bank account, you hereby authorize COOPTAVANZA R.L. to charge your bank account for a lesser amount, than the amount of the transfer (i.e., for a transfer of $500, COOPTAVANZA R.L. may debit the bank account for $499.98), as part of our effort to confirm ownership of the account. Be advised that certain recipient payers (banks, agents, etc., will calculate the payout amount by a different manner than COOPTAVANZA R.L., and therefore you may not get the exact payout amount (results of currency exchange rate fluctuations, system limitations, etc.). Unless otherwise specified, all dollar amounts shown in this Agreement are in U.S. Dollars. Collection of Payment for Transactions In order for us to collect payment from you, you hereby authorize COOPTAVANZA R.L. to access, charge, or debit funds from any of the payment instruments you provide as a user of the Service, so that COOPTAVANZA R.L. may collect all payments, fees, reimbursements and charges due to COOPTAVANZA R.L. in connection with your use of the Service (a "Payment Instrument" includes but is not limited to credit cards, debit cards or bank accounts). You are responsible for ensuring that there are sufficient funds available in the designated account in order to complete all transactions you authorize. If for any reason the funding bank provides COOPTAVANZA R.L. with an NSF notice, or refuses to pay for any reason, we reserve the right to cancel transaction, and/or your account, and collect an NSF Fee as noted above (see Fees and Charges). If for any reason, the Recipient bank account being used for deposit of funds refuses the receipt of a transaction for any reason, we reserve the right to cancel transaction. Please note that due to timing issues, we may not be made aware of such decline notices for a period of 5-7 days after transaction is made to COOPTAVANZA R.L. from the Recipient’s bank. The result of this may cause a delay in the cancellation, and the refund to your funding account. COOPTAVANZA R.L. will not be held liable for any delayed deposits, rejections, or returns from the receiving bank. Other Charges May Apply COOPTAVANZA R.L. is not responsible for any fees or charges that may be imposed by financial institutions associated with the Payment Instrument(s) you choose to use. Some credit card issuers may treat the use of your credit card to use the Service as a "cash-advance" and, as such, may impose additional fees, service charges and interest on the transaction. COOPTAVANZA R.L. is not responsible for any such practices and those of any other institutions and any such events outside of COOPTAVANZA R.L. control. COOPTAVANZA R.L. is not responsible for reimbursement of charges imposed to you by any financial institution or company or person you pay using Service. You agree to be responsible for insufficient funds charges, Non-Sufficient Funds (NSF) fees, late fees, chargeback fees, overdraft, cancellation, or other similar charges that might be imposed on you by your bank, credit card or debit card issuer, or any other funds provider.`,
					fontSize: 7,
					bold: true,
					margin: [0, 20, 0, 10]
				}, {
					margin: [180, 20, 0, 10],
					canvas: [
						{
							type: 'line',
							x1: 0,
							y1: 0,
							x2: 160,
							y2: 0,
							lineWidth: 1,
							lineColor: '#000',
							alignment: 'center'
						}
					]
				}, {
					text: 'Signature over Printed Name',
					fontSize: 10,
					bold: true,
					alignment: 'center'
				}
			]
		};
	}

	getOfficeAddressDetails() {
		const { qrtText, hNum, calleQuinta, deltext, cityText, republicText, email,
			panamaNum, usaNum, ukNum } = this.itemsList;
		return {
			margin: [5, 30, 0, 0],
			columns: [
				[
					{
						text: qrtText,
						fontSize: 7
					},
					{
						text: hNum,
						fontSize: 7
					}, {
						text: calleQuinta,
						fontSize: 7
					}, {
						text: deltext,
						fontSize: 7
					}, {
						text: cityText,
						fontSize: 7
					}, {
						text: republicText,
						fontSize: 7
					}
				],
				[{
					text: email,
					fontSize: 7,
					alignment: 'right'
				},
				{
					text: panamaNum,
					fontSize: 7,
					alignment: 'right'
				}, {
					text: usaNum,
					fontSize: 7,
					alignment: 'right'
				}, {
					text: ukNum,
					fontSize: 7,
					alignment: 'right'
				}]
			]
		};
	}


	senderDetails() {
		// $('#receiptmodal').modal('show');
		const { senderText, senderval, originText, originVal, receivertext, receiverVal,
			destinationText, destinationVal, receiviningAmountText, receiviningAmountVal } = this.itemsList;
		return {
			margin: [0, 2, 0, 0],
			columns: [
				[
					{
						text: `${senderText}${senderval}`, // 'Sender: HITESH DHUMONE',
						fontSize: 7
					},
					{
						text: `${originText}${originVal}`, // 'Origin: PANAMA',
						fontSize: 7
					}, {
						text: `${receivertext} ${receiverVal}`, // 'Receiver: HITESH DHUMONE',
						fontSize: 7
					}, {
						text: `${destinationText}${destinationVal}`, // 'Destination: INDIA',
						fontSize: 7
					}, {
						text: `${receiviningAmountText}${receiviningAmountVal}`, // 'Receiving Amount: INR 106,425.00',
						fontSize: 7
					}
				]
			]
		};
	}
}
