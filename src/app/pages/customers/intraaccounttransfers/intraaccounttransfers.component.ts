import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-intraaccounttransfers',
  templateUrl: './intraaccounttransfers.component.html',
   styleUrls: ['./intraaccounttransfers.component.scss'],
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
export class IntraaccountTransfersComponent implements OnInit {
    intraAccountForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.intraAccountForm.controls) {
      this.intraAccountForm.controls[key].markAsDirty();
      this.intraAccountForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.intraAccountForm.reset();
    for (const key in this.intraAccountForm.controls) {
      this.intraAccountForm.controls[key].markAsPristine();
      this.intraAccountForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.intraAccountForm = this.fb.group({
     
        code: [null, Validators.compose([
        Validators.required
      ])],
	  mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')
      ])],
	     fromAccount: [null, Validators.compose([
        Validators.required
      ])],
	      toAccount: [null, Validators.compose([
        Validators.required
      ])],
	       amountTranfered: [null, Validators.compose([
        Validators.required
      ])],
	    carrier: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
