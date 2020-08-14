import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-etransfers',
  templateUrl: './etransfers.component.html',
   styleUrls: ['./etransfers.component.scss'],
  styles: [':host ::ng-deep .ql-container {height: 200px;}'],
})
export class EtransfersComponent implements OnInit {

   eTransferForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.eTransferForm.controls) {
      this.eTransferForm.controls[key].markAsDirty();
      this.eTransferForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.eTransferForm.reset();
    for (const key in this.eTransferForm.controls) {
      this.eTransferForm.controls[key].markAsPristine();
      this.eTransferForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.eTransferForm = this.fb.group({
     
        code: [null, Validators.compose([
        Validators.required
      ])],
	  mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')
      ])],
	    securityQuestion: [null, Validators.compose([
        Validators.required
      ])],
	    securityAnswer: [null, Validators.compose([
        Validators.required
      ])],
	   firstName: [null, Validators.compose([
        Validators.required
      ])],
	   lastName: [null, Validators.compose([
        Validators.required
      ])],
	   fromAccount: [null, Validators.compose([
        Validators.required
      ])],
	  
	    currency: [null, Validators.compose([
        Validators.required
      ])],
	  
	    amountPays: [null, Validators.compose([
        Validators.required
      ])]
	  
    });
  }
    ngOnInit(){}
}
