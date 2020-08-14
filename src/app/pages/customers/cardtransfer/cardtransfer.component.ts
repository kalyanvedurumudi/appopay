import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-cardtransfer',
  templateUrl: './cardtransfer.component.html',
   styleUrls: ['./cardtransfer.component.scss'],
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
export class CardTransferComponent implements OnInit {
    topupAirtimeForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.topupAirtimeForm.controls) {
      this.topupAirtimeForm.controls[key].markAsDirty();
      this.topupAirtimeForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.topupAirtimeForm.reset();
    for (const key in this.topupAirtimeForm.controls) {
      this.topupAirtimeForm.controls[key].markAsPristine();
      this.topupAirtimeForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.topupAirtimeForm = this.fb.group({
     
        code: [null, Validators.compose([
        Validators.required
      ])],
	  mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')
      ])],
	  
	    carrier: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
