import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { LocalStorageService } from 'ngx-webstorage';
import { On } from '@ngrx/store';
import { ApiProvider } from 'src/app/services/api-provider';
import { ReplaySubject, Subject } from 'rxjs';
import { Bank } from 'src/app/modal/common-modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'air-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  countries: Array<any>;
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  protected _onDestroy = new Subject<void>();


  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private storage: LocalStorageService,
    private apiProvider: ApiProvider
    ) {
      // email: ['admin@mediatec.org', [Validators.required, Validators.minLength(4)]],
      // password: ['mediatec', [Validators.required]],

    this.form = fb.group({
      mobilenumber: [null, Validators.compose([
        Validators.required, Validators.maxLength(12), Validators.pattern("^[0-9]*$")
      ])],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20)
      ])],
      country: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.storage.clear();
    this.getCountry();
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    // const mobile = this.form.value.mobilenumber;
    // const areacode = this.bankCtrl.value.areacode;
    // const newnumber = areacode + mobile;
    // const usertype = this.form.value.usertype;
    // this.storage.store('USTYPE', usertype);
    // this.spinner.show();
    // this.apiProvider.getWithoutAuth('users/mobilemapping/' + newnumber + '/' + usertype + '').subscribe(
    //   async validatedata => {
    //   });
    // this.authService.SignIn(this.email.value, this.password.value)
  }

  async getCountry() {

    this.apiProvider.getWithoutAuth('configurations/country').subscribe(
      async resdata => {
        this.countries = resdata.result;
        this.filteredBanks.next(this.countries.slice());
        // this.bankFilterCtrl.valueChanges
        //   .pipe(takeUntil(this._onDestroy))
        //   .subscribe(() => {
        //     this.filterBanks();
        //   });

      }, async (error) => {

      });

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
