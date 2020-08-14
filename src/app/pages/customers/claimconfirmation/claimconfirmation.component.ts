import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-claimconfirmation',
  templateUrl: './claimconfirmation.component.html',
   styleUrls: ['./claimconfirmation.component.scss'],
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
export class ClaimconfirmationComponent implements OnInit {
  accountTransfersForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.accountTransfersForm.controls) {
      this.accountTransfersForm.controls[key].markAsDirty();
      this.accountTransfersForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.accountTransfersForm.reset();
    for (const key in this.accountTransfersForm.controls) {
      this.accountTransfersForm.controls[key].markAsPristine();
      this.accountTransfersForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder) {
    this.accountTransfersForm = this.fb.group({
     
        toCurrency: [null, Validators.compose([
        Validators.required
      ])],
	   fromAccount: [null, Validators.compose([
        Validators.required
      ])],
	  
	   yourName: [null, Validators.compose([
        Validators.required
      ])],
	  
	    amountTranfered: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
