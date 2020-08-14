import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-cardchangecurrency',
  templateUrl: './cardchangecurrency.component.html',
   styleUrls: ['./cardchangecurrency.component.scss'],
  styles: [':host ::ng-deep .ql-container {height: 200px;}'],
})
export class CardchangeCurrencyComponent implements OnInit {

 cardchangeCurrencyForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.cardchangeCurrencyForm.controls) {
      this.cardchangeCurrencyForm.controls[key].markAsDirty();
      this.cardchangeCurrencyForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.cardchangeCurrencyForm.reset();
    for (const key in this.cardchangeCurrencyForm.controls) {
      this.cardchangeCurrencyForm.controls[key].markAsPristine();
      this.cardchangeCurrencyForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.cardchangeCurrencyForm = this.fb.group({
     
      email: ['', [Validators.email, Validators.required]],
     
     fromAccount: [null, Validators.compose([
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
	  expMonth: [null, Validators.compose([
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
