import { Component, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-banktobanktransfer',
  templateUrl: './banktobanktransfer.component.html',
   styleUrls: ['./banktobanktransfer.component.scss'],
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
export class BanktoBanktransferComponent implements OnInit {
 closeResult: string

  ngOnInit() {}
    open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      },
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }
addCardForm: FormGroup;

  submitForm(value: { email: string;  }): void {
    for (const key in this.addCardForm.controls) {
      this.addCardForm.controls[key].markAsDirty();
      this.addCardForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addCardForm.reset();
    for (const key in this.addCardForm.controls) {
      this.addCardForm.controls[key].markAsPristine();
      this.addCardForm.controls[key].updateValueAndValidity();
    }
  }






  constructor(private fb: FormBuilder,private modalService: NgbModal) {
    this.addCardForm = this.fb.group({
     
     
     cardNumber: [null, Validators.compose([
        Validators.required
      ])],
	    ccExp: [null, Validators.compose([
        Validators.required
      ])],

      cvv: [null, Validators.compose([
        Validators.required
      ])],
	
	    fullName: [null, Validators.compose([
        Validators.required
      ])],
    
	 isDefault: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
}
