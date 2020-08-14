import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'air-system-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	
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
  
     firstName: [null, Validators.compose([
        Validators.required
      ])],
	    middleName: [null, Validators.compose([
        Validators.required
      ])],

      lastName: [null, Validators.compose([
        Validators.required
      ])],
	  
	     transactionPin: [null, Validators.compose([
        Validators.required
      ])],
	    code: [null, Validators.compose([
        Validators.required
      ])],
	      mobileNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[0-9]*$')
      ])],
	    emailAddress: [null, Validators.compose([
        Validators.required, Validators.email
      ])],
	     passwordnew: [null, Validators.compose([
        Validators.required, Validators.minLength(6)
      ])],
	      confirmPassword: [null, Validators.compose([
        Validators.required
      ])],
	   currency: [null, Validators.compose([
        Validators.required
      ])],
     country: [null, Validators.compose([
        Validators.required
      ])],
 
	    state: [null, Validators.compose([
        Validators.required
      ])],
    
	 city: [null, Validators.compose([
        Validators.required
      ])],
	   address: [null, Validators.compose([
        Validators.required
      ])],
	   dob: [null, Validators.compose([
        Validators.required
      ])],
	   mobilescreen: [null, Validators.compose([
        Validators.required
      ])],
	  
	   achievment: [null, Validators.compose([
        Validators.required
      ])],
	   otp: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
    ngOnInit(){}
}
