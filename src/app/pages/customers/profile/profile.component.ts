import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiProvider } from '@app/services/api-provider';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
export class ProfileComponent implements OnInit {
  activeKey = 0;
  onPersonalDetailsForm: any;
  countries: Array<any>;
  userObj: any;
  base64Image = null;
  filterdata: any;
  states: Array<any>;
  statename = null;

  constructor(
    private router: Router,
    private apiProvider: ApiProvider,
    private authService: AuthService,
    private storage: LocalStorageService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.userObj = this.storage.retrieve('userDetails');
  }

  ngOnInit() {

    this.onPersonalDetailsForm = this.formBuilder.group({
      firstName: [null, Validators.compose([
        Validators.required
      ])],
      middleName: [null, Validators.compose([
      ])],
      lastName: [null, Validators.compose([
        Validators.required
      ])],
      country: [null, Validators.compose([
        Validators.required
      ])],
      state: [null, Validators.compose([
        Validators.required
      ])],
      city: [null, Validators.compose([
        Validators.required
      ])],
      address: [null, Validators.compose([
        Validators.required
      ])],
      dob: [null, Validators.compose([
        Validators.required
      ])],
      email: [null, Validators.compose([
        Validators.required
      ])]
    });


    this.countries = this.authService.getCountries();
    if (!this.countries || (this.countries && this.countries.length)) {
      this.authService.getCountry().subscribe(resdata => {
        this.countries = resdata.result;
        this.authService.setCountries(this.countries);
      }, () => { });
    }
    this.latestUserDetails();
  }

  latestUserDetails() {
    const mobileno = this.userObj.mobilenumber;
    const areacode = this.userObj.phonecode;
    const usertype = this.userObj.usertype;

    this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + usertype).subscribe(
      async resdata => {
        this.userObj = resdata.result;
        this.base64Image = this.userObj.customerdetails.imageurl;
        this.storage.clear('userDetails');
        this.storage.store('userDetails', resdata.result);
        this.setFormData();
      }, async () => { });
  }

  setFormData() {
    this.onPersonalDetailsForm.controls.firstName.setValue(this.userObj.customerdetails.firstName);
    this.onPersonalDetailsForm.controls.middleName.setValue(this.userObj.customerdetails.middlename);
    this.onPersonalDetailsForm.controls.lastName.setValue(this.userObj.customerdetails.lastName);
    this.onPersonalDetailsForm.controls.city.setValue(this.userObj.customerdetails.cityname);
    this.onPersonalDetailsForm.controls.address.setValue(this.userObj.customerdetails.address);
    this.onPersonalDetailsForm.controls.dob.setValue(this.userObj.customerdetails.dob);
    this.onPersonalDetailsForm.controls.email.setValue(this.userObj.email);
    this.onPersonalDetailsForm.controls.country.setValue(this.userObj.customerdetails.countryid);
    this.enableStateDropdown();
  }

  enableStateDropdown() {
    const countryid = this.userObj.customerdetails.countryid;
    this.filterdata = this.countries.filter(function (country) {
      return country.id == countryid;
    });
    this.states = this.filterdata[0].states;
    const stid = this.userObj.customerdetails.stateid;
    const filterdata3 = this.states.filter(function (states) {
      return states.id == stid;
    });
    this.statename = filterdata3[0].statename;
    this.onPersonalDetailsForm.controls.state.setValue(this.userObj.customerdetails.stateid);
  }

  async updateEmailId() {
    if (this.userObj.email == this.onPersonalDetailsForm.value.email) {
      this.updateUser();
      // this.updateEmail();
    } else {
      const email = this.onPersonalDetailsForm.value.email;
      this.apiProvider.getWithoutAuth('users/verifyemail/' + email).subscribe(
        async resdata => {
          if (resdata.result) {
            //this.loadingController.dismiss();
            this.notification.warning('Warning', 'Email id already exists');
          } else {
            this.updateUser();
          }
        }, async () => {
        });
    }
  }

  updateUser() {
    const insertdata = {
      id: this.userObj.id,
      firstName: this.onPersonalDetailsForm.value.firstName,
      lastName: this.onPersonalDetailsForm.value.lastName,
      username: this.userObj.username,
      password: this.userObj.password,
      email: this.onPersonalDetailsForm.value.email,
      mobilenumber: this.userObj.mobilenumber,
      transactionpin: this.userObj.transactionpin,
      phonecode: this.userObj.phonecode,
      securityanswer: this.userObj.securityanswer,
      role: [
        'USER'
      ],
      accountexpired: this.userObj.accountexpired,
      credentialsexpired: this.userObj.credentialsexpired,
      accountlocked: this.userObj.accountlocked,
      enabled: this.userObj.enabled,
      customerdetails: {
        id: this.userObj.customerdetails.id,
        firstName: this.onPersonalDetailsForm.value.firstName,
        lastName: this.onPersonalDetailsForm.value.lastName,
        middlename: this.onPersonalDetailsForm.value.middleName,
        cardtoken: this.userObj.customerdetails.cardtoken,
        countryid: this.onPersonalDetailsForm.value.country,
        stateid: this.onPersonalDetailsForm.value.state,
        address: this.onPersonalDetailsForm.value.address,
        dob: this.onPersonalDetailsForm.value.dob,
        cityname: this.onPersonalDetailsForm.value.city,
        currencyid: this.userObj.customerdetails.currencyid,
        customeraccounts: this.userObj.customerdetails.customeraccount,
        bankaccount: this.userObj.customerdetails.bankaccount,
        bankusername: this.userObj.customerdetails.bankusername,
        imageurl: this.base64Image
      }
    };
    this.apiProvider.put('users', insertdata).subscribe(
      async resdata => {
        const res = resdata;
        if (!res.result) {
          this.notification.error('Error', 'Failed to update personal details!');

        } else {
          this.notification.success('Success', 'Personal Details updated successfully');
          this.latestUserDetails();
        }
      }, async () => {
        this.notification.error('Error', 'Failed to update personal details!');
      });
  }
}
