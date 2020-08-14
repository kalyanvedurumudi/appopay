import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable ,Observer} from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-cardbasecurrency',
  templateUrl: './cardbasecurrency.component.html',
   styleUrls: ['./cardbasecurrency.component.scss'],
  styles: [':host ::ng-deep .ql-container {height: 200px;}'],
})
export class CardbaseCurrencyComponent implements OnInit {

 cardbaseCurrencyForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.cardbaseCurrencyForm.controls) {
      this.cardbaseCurrencyForm.controls[key].markAsDirty();
      this.cardbaseCurrencyForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.cardbaseCurrencyForm.reset();
    for (const key in this.cardbaseCurrencyForm.controls) {
      this.cardbaseCurrencyForm.controls[key].markAsPristine();
      this.cardbaseCurrencyForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.cardbaseCurrencyForm = this.fb.group({
     
      email: ['', [Validators.email, Validators.required]],
     
     fromAccount: [null, Validators.compose([
        Validators.required
      ])],
	    bankCurrency: [null, Validators.compose([
        Validators.required
      ])],
	    conversionRate: [null, Validators.compose([
        Validators.required
      ])],
	    amountAdded: [null, Validators.compose([
        Validators.required
      ])],
	    amountCredited: [null, Validators.compose([
        Validators.required
      ])],
	    fullName: [null, Validators.compose([
        Validators.required
      ])],

      cardNumber: [null, Validators.compose([
        Validators.required
      ])],
	    expYaer: [null, Validators.compose([
        Validators.required
      ])],
	 
	   cvv: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
