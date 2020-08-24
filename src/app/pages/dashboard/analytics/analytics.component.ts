
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
import { NestableSettings } from 'ngx-nestable/src/nestable.models'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiProvider } from '@app/services/api-provider';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './analytics.component.html',
})
export class DashboardAnalyticsComponent implements OnInit {
  closeResult: string
  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    title: 'Hummingbirds are amazing creatures'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    title: 'Example two with title.'
  }];
  userObj: any;
  customerAccounts: any;
  currencies: any[];

  ngOnInit() { 
    this.userObj = this.storage.retrieve('userDetails');
    this.customerAccounts = this.userObj.customerdetails.customeraccount;
    this.getCurrency();
  }

  async getCurrency() {
    this.spinner.show();
    this.apiProvider.getWithoutAuth('configurations/currency').subscribe(
      async resdata => {
        this.currencies = resdata.result;
        this.spinner.hide();
      }, async () => {
        this.spinner.hide();
      });
  }

  getCurrencyDesc(id: number): string {
    if (this.currencies && this.currencies.length > 0) {
      return this.currencies.find(curr => curr.id === id).currency_code;
    } 
    return '';
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
  dashboardForm: FormGroup;

  submitForm(value: { email: string; }): void {
    for (const key in this.dashboardForm.controls) {
      this.dashboardForm.controls[key].markAsDirty();
      this.dashboardForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.dashboardForm.reset();
    for (const key in this.dashboardForm.controls) {
      this.dashboardForm.controls[key].markAsPristine();
      this.dashboardForm.controls[key].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private storage: LocalStorageService, 
    private apiProvider: ApiProvider
    ) {
    this.dashboardForm = this.fb.group({


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
