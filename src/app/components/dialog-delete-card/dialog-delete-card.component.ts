import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-card',
  templateUrl: './dialog-delete-card.component.html',
  styleUrls: ['./dialog-delete-card.component.css'],
})
export class DialogDeleteCardComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteCardComponent>, @Inject(MAT_DIALOG_DATA) public xxx: { deleteExperience: boolean }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
