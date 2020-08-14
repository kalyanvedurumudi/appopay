import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss'],
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
export class ProfileComponent implements OnInit {
	
  constructor(private fb: FormBuilder) {}
  
    public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  marks = {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    60: '60',
    70: '70',
    80: '80',
    90: '90',
    100: '100',
  }
  validateForm1: FormGroup
  validateForm2: FormGroup
  submitForm1(): void {
    for (const i in this.validateForm1.controls) {
      if (this.validateForm1.controls.hasOwnProperty(i)) {
        this.validateForm1.controls[i].markAsDirty()
        this.validateForm1.controls[i].updateValueAndValidity()
      }
    }
  }
  submitForm2(): void {
    for (const i in this.validateForm2.controls) {
      if (this.validateForm2.controls.hasOwnProperty(i)) {
        this.validateForm2.controls[i].markAsDirty()
        this.validateForm2.controls[i].updateValueAndValidity()
      }
    }
  }
  ngOnInit(): void {
    this.validateForm1 = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      budget: [30],
    })
    this.validateForm2 = this.fb.group({
      amount: [null, [Validators.required]],
      pin: [null, [Validators.required]],
    })
  }
}
