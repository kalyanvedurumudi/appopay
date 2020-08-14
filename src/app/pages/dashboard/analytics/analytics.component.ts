
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
import { NestableSettings } from 'ngx-nestable/src/nestable.models'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

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
dashboardForm: FormGroup;

  submitForm(value: { email: string;  }): void {
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






  constructor(private fb: FormBuilder,private modalService: NgbModal) {
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
