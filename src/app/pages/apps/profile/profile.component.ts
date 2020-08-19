import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '@app/services/api-provider';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-apps-profile',
  templateUrl: './profile.component.html',
})
export class AppsProfileComponent implements OnInit {
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
        }, () => {});
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
      }, async () => {});
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

  changeKey(key) {
    this.activeKey = key
  }
}
