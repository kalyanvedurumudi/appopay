import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'vex-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: []
})
export class ConfirmationDialogComponent {
  message: string;
  constructor(
    public dialogRef: NgbActiveModal) { }
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmClick(): void {
    this.dialogRef.close(true);
  }
}