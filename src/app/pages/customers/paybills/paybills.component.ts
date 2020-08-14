import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-paybills',
  templateUrl: './paybills.component.html',
   styleUrls: ['./paybills.component.scss'],
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
export class PayBillsComponent implements OnInit {
  payBillsForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.payBillsForm.controls) {
      this.payBillsForm.controls[key].markAsDirty();
      this.payBillsForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.payBillsForm.reset();
    for (const key in this.payBillsForm.controls) {
      this.payBillsForm.controls[key].markAsPristine();
      this.payBillsForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.payBillsForm = this.fb.group({
     
     
	  serviceType: [null, Validators.compose([
        Validators.required
      ])],
     fromAccount: [null, Validators.compose([
        Validators.required
      ])],
	  
	    country: [null, Validators.compose([
        Validators.required
      ])],
	    amountPay: [null, Validators.compose([
        Validators.required
      ])],
	    serviceProviders: [null, Validators.compose([
        Validators.required
      ])],

      providerProduct: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
