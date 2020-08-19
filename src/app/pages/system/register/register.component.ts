import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { ApiProvider } from '@app/services/api-provider';
import { MustMatch } from '@app/services/must-match.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
@Component({
  selector: 'air-system-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;
  countries: Array<any>;
  currencies: Array<any>;
  states: Array<any>;
  sendOTP = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private apiProvider: ApiProvider,
    private notification: NzNotificationService,
    private storage: LocalStorageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.countries = this.authService.getCountries();
    if (!this.countries || (this.countries && this.countries.length)) {
      this.authService.getCountry().subscribe(resdata => {
        this.countries = resdata.result;
        this.authService.setCountries(this.countries);
      }, () => { });
    }

    this.validateForm = this.fb.group({
      firstName: [null, Validators.compose([
        Validators.required
      ])],
      // middleName: [null, Validators.compose([
      //   Validators.required
      // ])],
      lastName: [null, Validators.compose([
        Validators.required
      ])],
      // transactionPin: [null, Validators.compose([
      //   Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')
      // ])],
      code: [null, Validators.compose([
        Validators.required
      ])],
      mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")
      ])],
      emailAddress: [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      passwordnew: [null, Validators.compose([
        Validators.required, Validators.minLength(6)
      ])],
      confirmPassword: [null, Validators.compose([
        Validators.required, Validators.minLength(6)
      ])],
      // currency: [null, Validators.compose([
      //   Validators.required
      // ])],
      // country: [null, Validators.compose([
      //   Validators.required
      // ])],
      // state: [null, Validators.compose([
      //   Validators.required
      // ])],
      // city: [null, Validators.compose([
      //   Validators.required
      // ])],
      // address: [null, Validators.compose([
      //   Validators.required
      // ])],
      // dob: [null, Validators.compose([
      //   Validators.required
      // ])],
      // mobilescreen: [null, Validators.compose([
      //   Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')
      // ])],
      // achievment: [null, Validators.compose([
      //   Validators.required
      // ])],
      otp: [null, Validators.compose([
        Validators.required
      ])]
    },
      {
        validator: MustMatch('passwordnew', 'confirmPassword')
      });
    // this.getCurrency();
  }

  submitForm(value: { email: string; }): void {
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  enableStateDropdown() {
    const country = this.validateForm.get('code').value;
    const filterdata = this.countries.filter(function (ctry) {
      return ctry.areacode == country.areacode;
    });
    this.states = filterdata[0].states;
  }

  async validatePhone() {
    const mobile = this.validateForm.value.mobileNumber;
    const areacode = this.validateForm.value.code.areacode;
    const mbnumber = areacode + mobile;
    this.apiProvider.getWithoutAuth('users/checkmobile/' + mbnumber + '/CUSTOMER').subscribe(
      async resdata => {
        if (!resdata.result) {
          this.notification.warning('Warning', 'Mobile number already exists');
        } else {
          this.validateEmail();
        }
      }, async () => {});

  }

  async validateEmail() {
    this.spinner.show();
    const email = this.validateForm.value.emailAddress;
    this.apiProvider.getWithoutAuth('users/verifyemail/' + email).subscribe(
      async resdata => {
        if (resdata.result) {
          this.spinner.hide();
          this.notification.warning('Warning', 'Email id already exists');
        } else {
          this.goToPin();
        }
      }, async () => {
        this.spinner.hide();
      });
  }

  async goToPin() {
    if (this.sendOTP) {
      this.sendOTP = false;
    }
    const newnumber = '+' + this.validateForm.value.code.areacode + this.validateForm.value.mobileNumber;
    const verifydata = {
      phone_number: newnumber
    };
    this.apiProvider.postWithoutAuth('otp/generateotp', verifydata).subscribe(
      async resdata => {
        this.spinner.hide();
        const res = resdata;
        if (res.result === false) {
          this.notification.warning('Warning', 'Failed to send Otp please try after some time.');
        } else {
          this.notification.success('Success', 'Otp Send Successfully,Otp is valid only for 5 min');
        }
      }, async () => {
        this.spinner.hide();
        this.notification.error('error', 'Failed to send Otp please try after some time.');
      });
  }



  async signUpPin() {
    const newnumber = '+' + this.validateForm.value.code.areacode + this.validateForm.value.mobileNumber;
    const verifycontent = {
      phone_number: newnumber,
      otp_number: this.validateForm.get('otp').value
    };
    this.apiProvider.postWithoutAuth('otp/verifyOTP', verifycontent).subscribe(
      async resdata => {
        const res = resdata;
        if (!res) {
          this.notification.warning('Warning', 'Please enter a valid OTP !');
        } else {
          this.createUser();
        }
      }, async () => {
        this.notification.error('Error', 'OTP verification failed please try again !');
      });
  }

  createUser() {
    const usernames = this.validateForm.value.code.areacode + this.validateForm.value.mobileNumber;
    const insertdata = {
      firstName: this.validateForm.value.firstName,
      lastName: this.validateForm.value.lastName,
      username: usernames,
      password: this.validateForm.value.password,
      email: this.validateForm.value.emailAddress,
      mobilenumber: this.validateForm.value.mobileNumber,
      phonecode: this.validateForm.value.code.areacode,
      countryid: this.validateForm.value.code.id,
      role: [
        'USER'
      ],
      accountexpired: false,
      credentialsexpired: false,
      accountlocked: false,
      enabled: true,
      customerdetails: {
        firstName: this.validateForm.value.firstName,
        lastName: this.validateForm.value.lastName
      }
    };
    
    this.spinner.show();
    this.apiProvider.postWithoutAuth('api/users/createnewuser', insertdata).subscribe(
      async rdata => {
        this.spinner.hide();
        if (rdata.result == null) {
          this.notification.warning('Warning', 'Failed to register your details,Please try after some time');
        } else {
          this.notification.success('Euccess', 'Registration successful,Please login with your details');
          this.router.navigate(['/login']);
        }
      }, async () => {
        this.spinner.hide();
        this.notification.error('Error', 'Failed to register your details,Please try after some time');
      });
  }

  // async getCurrency() {
  //   this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
  //     async resdata => {
  //       this.currencies = resdata.result;
  //     }, async () => { });
  // }
}
