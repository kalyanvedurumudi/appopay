import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Allcards } from '../models/allcards.model';
import { ApiProvider } from '@app/services/api-provider';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllcardsTableComponent } from './examples/allcardstable/allcardstable.component';
declare var swal: any;

@Component({
  selector: 'app-tables-antd',
  templateUrl: './allcards.component.html',
})
export class AllCardsComponent implements OnInit {
  closeResult: string;
  countries;
  addCardForm: FormGroup;

  mode: 'create' | 'update' = 'create';
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild(AllcardsTableComponent, { static: true }) allCardsTbleCmpt : AllcardsTableComponent;
  


  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private notification: NzNotificationService,    
    public activeModal: NgbActiveModal,
    private apiProvider: ApiProvider,
    private spinner: NgxSpinnerService,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.addCardForm = this.fb.group({
      id: [''],
      imageSrc: [''],
      ccnumber: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern("^[0-9]*$")
      ])],
      ccexpiry: [null, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern("^[0-9]*$")
      ])],
      cvv: [null, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern("^[0-9]*$")
      ])],
      firstname: [null, Validators.compose([
        Validators.required
      ])],
      isdefault: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.addCardForm.reset();

    this.countries = this.authService.getCountries();
    if (!this.countries || (this.countries && this.countries.length)) {
      this.authService.getCountry().subscribe(resdata => {
        this.countries = resdata.result;
        this.authService.setCountries(this.countries);
      }, () => { });
    }
  }

  open(allCards: Allcards, content: any) {
    if (allCards) {
      this.mode = 'update';
      this.addCardForm.patchValue({
        ...allCards
      })
      allCards.isdefault ? this.addCardForm.get('isdefault').setValue('Yes') : this.addCardForm.get('isdefault').setValue('No');
    }
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.close();
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
      this.allCardsTbleCmpt.createCustomer(customer);
    }
    this.close();
  }

  close(): void {
    this.activeModal.close();
  }

  updtCustomer(allCards: Allcards): void {
    this.closeResult = `Closed with: ${allCards}`;
    const message = 'Do you want to remove Card ?';

    swal.fire({
      title: message,
      showCancelButton: true
    }).then((transConfirm) => {
      if (transConfirm && transConfirm.isConfirmed) {
        this.spinner.show();
        this.apiProvider.delete('users/removecard/' + allCards.id + '').subscribe(
          async resdata => {
            this.spinner.hide();
            if (resdata.result == 1) {
              this.notification.success('Success', 'Card removed successfully');
              this.allCardsTbleCmpt.usercardetails();
            } else {
              this.notification.error('Error', 'Failed to remove card ,Please try after sometime.');
            }
          }, async () => {
            this.spinner.hide();
            this.notification.error('Error', 'Failed to update ,Please try after sometime.');
          });
      } 
    });
    this.close();
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
      this.updtCustomer(customer);
    }
  }
}
