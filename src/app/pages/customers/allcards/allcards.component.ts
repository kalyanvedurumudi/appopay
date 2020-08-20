import { Component, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tables-antd',
  templateUrl: './allcards.component.html',
})
export class AllCardsComponent implements OnInit {
  closeResult: string;
  countries;
  mode: 'create' | 'update' = 'create';

  ngOnInit() {
    
    this.countries = this.authService.getCountries();
    if (!this.countries || (this.countries && this.countries.length)) {
      this.authService.getCountry().subscribe(resdata => {
        this.countries = resdata.result;
        this.authService.setCountries(this.countries);
      }, () => { });
    }
  }
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

  submitForm(): void {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addCardForm.reset();
    this.addCardForm.get('isDefault').setValue('');
  }

  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private notification: NzNotificationService,
    private authService: AuthService
    ) {
    this.addCardForm = this.fb.group({
      cardNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern("^[0-9]*$")
      ])],
      ccExp: [null, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern("^[0-9]*$")
      ])],
      cvv: [null, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern("^[0-9]*$")
      ])],
      fullName: [null, Validators.compose([
        Validators.required
      ])],
      isDefault: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  createCustomer() {
    const customer = this.addCardForm.value;

    if (!customer.imageSrc) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    }
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    const cooptavanzaRegEx = /^(?:60891700[0-9]{11})$/;

    let isvalid = true;
    let cardtype = '';
    if (visaRegEx.test(customer.ccnumber)) {
      cardtype = 'VISA';
    } else if (mastercardRegEx.test(customer.ccnumber)) {
      cardtype = 'MASTER';
    } else if (amexpRegEx.test(customer.ccnumber)) {
      cardtype = 'AMEX';
    } else if (discovRegEx.test(customer.ccnumber)) {
      cardtype = 'DISCOVER';
    } else if (cooptavanzaRegEx.test(customer.ccnumber)) {
      cardtype = 'COOPTAVANZA';
    } else {
      isvalid = false;
      this.notification.warning('Warning', 'Please enter a valid card');
    }
    if (isvalid) {
      // this.dialogRef.close(customer);
    }
  }

  updateCustomer() {
    const customer = this.addCardForm.value;
    // customer.id = this.defaults.id;

    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    const cooptavanzaRegEx = /^(?:60891700[0-9]{11})$/;


    let isvalid = true;
    let cardtype = '';
    if (visaRegEx.test(customer.ccnumber)) {
      cardtype = 'VISA';
    } else if (mastercardRegEx.test(customer.ccnumber)) {
      cardtype = 'MASTER';
    } else if (amexpRegEx.test(customer.ccnumber)) {
      cardtype = 'AMEX';
    } else if (discovRegEx.test(customer.ccnumber)) {
      cardtype = 'DISCOVER';
    } else if (cooptavanzaRegEx.test(customer.ccnumber)) {
      cardtype = 'COOPTAVANZA';
    } else {
      isvalid = false;
      this.notification.warning('Warning', 'Please enter a valid card');
    }
    if (isvalid) {
      // this.dialogRef.close(customer);
    }
  }
}
