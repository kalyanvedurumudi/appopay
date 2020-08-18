import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { LocalStorageService } from 'ngx-webstorage';
import { ApiProvider } from 'src/app/services/api-provider';
import { ReplaySubject, Subject } from 'rxjs';
import { Bank } from 'src/app/modal/common-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { USET_TYPE } from '@app/constants';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'air-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  countries: Array<any>;
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  protected _onDestroy = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: LocalStorageService,
    private apiProvider: ApiProvider,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) {
      // email: ['admin@mediatec.org', [Validators.required, Validators.minLength(4)]],
      // password: ['mediatec', [Validators.required]],

    this.loginForm = this.fb.group({
      mobilenumber: [null, Validators.compose([
        Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")
      ])],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20)
      ])],
      country: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['dashboard/analytics']);      
    } else {
      this.storage.clear();
      this.getCountry();

    }
  }

  get email() {
    return this.loginForm.controls.email
  }
  get password() {
    return this.loginForm.controls.password
  }

  submitForm(): void {
    const mobile = this.loginForm.value.mobilenumber;
    const areacode = this.loginForm.value.country;
    const newnumber = areacode + mobile;
    this.storage.store('USTYPE', USET_TYPE);
    this.spinner.show();
    this.apiProvider.getWithoutAuth('users/mobilemapping/' + newnumber + '/' + USET_TYPE + '').subscribe(
      async validatedata => {
        const uniquenumber = validatedata.result.uniquenumber;

        const inputdata = {
          username: uniquenumber,
          password: this.loginForm.value.password,
          grant_type: 'password'
        };
        this.apiProvider.login('oauth/token', inputdata).subscribe(
          async resdata => {
            const res = resdata;
            if (resdata) {
              this.storage.store('access_token', res.access_token);
              const mobileno = this.loginForm.value.mobilenumber;

              this.apiProvider.get('users/findbyMobile/' + mobileno + '/' + areacode + '/' + USET_TYPE).subscribe(
                async userdata => {
                  if (userdata.result) {
                    this.spinner.hide();
                    this.storage.store('userDetails', userdata.result);
                    let accounts = [];
                    if (userdata.result.customerdetails != null) {
                      accounts = userdata.result.customerdetails.customeraccount;
                    }
                    const rolename = userdata.result.roles[0].name;
                    console.log(rolename);
                    if (accounts.length == 0) {
                      this.storage.store('ROLE', 'ADMIN');
                    } else {
                      this.storage.store('ROLE', rolename);
                    }
                    if (rolename == 'MERCHANT') {
                      this.storage.clear('isModify');
                      this.storage.clear('umobilenumber');
                      this.storage.clear('uphonecode');
                      this.storage.store('isModify', 'Y');
                      this.storage.store('umobilenumber', mobileno);
                      this.storage.store('uphonecode', areacode);
                      this.storage.clear('isdeal');
                      this.storage.store('isdeal', userdata.result.customerdetails.isdeal);

                    }
                    // this.notificationMessageService.setMessage(true);
                    // this.loginMessageService.setMessage(true);
                    this.router.navigate(['dashboard/analytics']);
                    this.notification.success(
                      'Logged In',
                      'You have successfully logged in to AppoPay - Payments & Money Transfer Admin Template!',
                    )
                  } else {
                    this.spinner.hide();
                    this.notification.warning('Warning', 'Please Enter correct mobile number or password.');
                  }
                }, async () => {
                  this.spinner.hide();
                  this.notification.error('Error', 'Some thing went wrong please try after sometime or contact admin');

                });


            } else {
              this.spinner.hide();
              this.notification.warning('Warning', 'Please Enter correct mobile number or password.');
            }

          }, async (error) => {
            this.spinner.hide();
            this.notification.error('Error', 'Some thing went wrong please try after sometime or contact admin');

          });

      }, async (error) => {
        this.spinner.hide();
        this.notification.error('Error', 'Some thing went wrong please try after sometime or contact admin');

      });
  }

  async getCountry() {

    this.apiProvider.getWithoutAuth('configurations/country').subscribe(
      async resdata => {
        this.countries = resdata.result;
        this.authService.setCountries(this.countries);
        this.filteredBanks.next(this.countries.slice());
        // this.bankFilterCtrl.valueChanges
        //   .pipe(takeUntil(this._onDestroy))
        //   .subscribe(() => {
        //     this.filterBanks();
        //   });

      }, async () => {});

  }

  protected filterBanks() {
    if (!this.countries) {
      return;
    }
    // get the search keyword
    // let search = this.bankFilterCtrl.value;
    let search;
    if (!search) {
      this.filteredBanks.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBanks.next(
      this.countries.filter(
        bank => bank.countryname.toLowerCase().indexOf(search) > -1)
    );
  }
}
