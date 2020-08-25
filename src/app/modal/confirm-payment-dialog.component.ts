import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'vex-confirm-payment-dialog',
  templateUrl: './confirm-payment-dialog.component.html',
  styleUrls: []
})
export class ConfirmationPaymentDialogComponent {
  constructor(
    private dialogRef: NgbActiveModal) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmClick(): void {
    this.dialogRef.close(true);
  }
}