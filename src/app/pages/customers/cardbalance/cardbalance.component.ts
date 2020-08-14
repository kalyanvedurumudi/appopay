import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-cardbalance',
  templateUrl: './cardbalance.component.html',
   styleUrls: ['./cardbalance.component.scss'],
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
export class CardBalanceComponent implements OnInit {
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
     
     Country: ['', Validators.required],
			State: ['', Validators.required],
			City: ['', Validators.required],
			paymentMode: ['', Validators.required],
			
			Payers: ['', Validators.required],
			payerssendAmount: ['', Validators.required], 
			payersreceiverAmount: ['', Validators.required],
			payersreceiverCountry: ['', Validators.required],
			payerssenderCurrency: ['', Validators.required],
			payersreceiverCurrency: ['', Validators.required],
			
			receiversfirstName: ['', Validators.required],
			receiverslastName: ['', Validators.required],
			
			receiversAddress: ['', Validators.required],
		    receiversCountry: ['', Validators.required],
		    receiversState: ['', Validators.required],
			receiversCity: ['', Validators.required],
			receiverspostalCode: ['', Validators.required],
			
			
            receiversEmail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
			receiversNumber: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$')]],
			receivershomeNumber: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$')]],
			receiversworkNumber: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$')]],
			receiversNat: ['', Validators.required],
			
			partner: ['', Validators.required],
			transactionType: ['', Validators.required],
			serviceType: ['', Validators.required],
			
			sendersfullName: ['', Validators.required],
			senderscardNumber: ['', [Validators.required, Validators.minLength(10),]],
			sendersdate: ['', Validators.required],
			
			sendersAddress: ['', Validators.required],
		    sendersCountry: ['', Validators.required],
		    sendersState: ['', Validators.required],
			sendersCity: ['', Validators.required],
			senderspostalCode: ['', Validators.required],
			
			sendersEmail: ['', [Validators.required, Validators.email]],
            
			sendersNumber: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$')]],
			sendershomeNumber: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$')]],
			sendersworkNumber: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$')]],
			sendersNat: ['', Validators.required],
			
			typeofId: ['', Validators.required],
			idNum: ['', Validators.required],
			idExp: ['', Validators.required],
		
			
			
 

	   nati: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
