import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-basecurrency',
  templateUrl: './basecurrency.component.html',
   styleUrls: ['./basecurrency.component.scss'],
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
export class BaseCurrencyComponent implements OnInit {
 validateForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
     
      email: ['', [Validators.email, Validators.required]],
     
     fromAccount: [null, Validators.compose([
        Validators.required
      ])],
	    country: [null, Validators.compose([
        Validators.required
      ])],

      bankName: [null, Validators.compose([
        Validators.required
      ])],
	    routingNumber: [null, Validators.compose([
        Validators.required
      ])],
	  
	     bankCurrency: [null, Validators.compose([
        Validators.required
      ])],
	      accountType: [null, Validators.compose([
        Validators.required
      ])],
	   accountholderName: [null, Validators.compose([
        Validators.required
      ])],
    
      accountNumber: [null, Validators.compose([
        Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6)
      ])],
	    debitDate: [null, Validators.compose([
        Validators.required
      ])],
    
	 enterAmount: [null, Validators.compose([
        Validators.required
      ])],
      zip: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]*$')
      ])]
    });
  }
    ngOnInit(){}
}
