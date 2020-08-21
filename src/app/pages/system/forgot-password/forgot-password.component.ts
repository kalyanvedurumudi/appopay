import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ApiProvider } from '@app/services/api-provider';
import { LocalStorageService } from 'ngx-webstorage';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { AuthService } from '@app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal: any;

@Component({
  selector: 'air-system-forgo-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  countries: Array<any>;
  buttonaction = 1;

  constructor(
    private router: Router,
    private apiProvider: ApiProvider,
    private authService: AuthService,
    private storage: LocalStorageService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.countries = this.authService.getCountries();
    if (!this.countries || (this.countries && this.countries.length)) {
      this.authService.getCountry().subscribe(resdata => {
          this.countries = resdata.result;
          this.authService.setCountries(this.countries);
        }, () => {});
    }
    this.forgotPasswordForm = this.formBuilder.group({
      selectCode: [null, Validators.compose([
        Validators.required
      ])],
      mobilenumber: [null, Validators.compose([
        Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")
      ])],
      securityAnswer: [null, Validators.compose([
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20)
      ])],
      confirmPassword: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20)
      ])]

    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }



  async sendOtp() {
    const mobilenumber = '+' + this.forgotPasswordForm.get('selectCode').value + this.forgotPasswordForm.get('mobilenumber').value;
    const verifydata = {
      phone_number: mobilenumber
    };
    this.spinner.show();
    this.apiProvider.postWithoutAuth('otp/generateotp', verifydata).subscribe(
      async resdata => {
        const res = resdata;
        if (res.result === false) {
          this.notification.warning('Warning', 'Failed to send OTP please try after some time.');
        } else {
          this.notification.warning('Warning', 'OTP Send Successfully, OTP is valid only for 5 min');
          this.buttonaction = 2;
        }
        this.spinner.hide();
      }, async () => {
        this.notification.error('Error', 'Failed to send OTP please try after some time.');
        this.spinner.hide();
      });
  }

  async verifyOtp() {
    const mobilenumber = '+' + this.forgotPasswordForm.get('selectCode').value + this.forgotPasswordForm.get('mobilenumber').value;
    swal.fire({
      title: 'Enter OTP',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const datatransactionpin = result.value;
        const verifycontent = {
          phone_number: mobilenumber,
          otp_number: datatransactionpin
        };
        this.spinner.show();
        this.apiProvider.postWithoutAuth('otp/verifyOTP', verifycontent).subscribe(
          async resdata => {
            const res = resdata;
            if (!res) {
              this.notification.warning('Warning', 'Please enter a valid OTP !');
            } else {
              this.updatePassword();
            }
            this.spinner.hide();
          }, async () => {
            this.spinner.hide();
            this.notification.warning('Warning', 'OTP verification failed,Please try again!');
          });
      } else {
            this.spinner.hide();
            this.notification.warning('Warning', 'Please enter OTP');
      }

    });
  }


  updatePassword() {
    const insertdata = {
      mobilenumber: this.forgotPasswordForm.value.mobilenumber,
      areacode: this.forgotPasswordForm.value.selectCode,
      password: this.forgotPasswordForm.value.password,
      securityanswer: this.forgotPasswordForm.value.securityAnswer
    };

    this.spinner.show();
    this.apiProvider.postWithoutAuth('users/resetpassword', insertdata).subscribe(
      async resdata => {
        const res = resdata;
        if (res.result == '1') {
          this.storage.clear();
          this.notification.success('Success', 'Password reset Successfully,Please login with your new password');
          this.router.navigate(['/login']);

        } else if (res.result == '-2') {
         this.notification.warning('Warning', 'Please enter a valid security answer which you have provided during registration');
        } else if (res.result == '0') {
         this.notification.warning('Warning', 'User Details dosent exists');
        } else {
         this.notification.warning('Warning', 'Failed to reset your password!');
        }
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
        this.notification.error('Warning', 'Failed to reset your password!');
      });


  }

}
