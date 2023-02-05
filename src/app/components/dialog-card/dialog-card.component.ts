import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogContent} from "../shared/DialogContent";

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.css']
})
export class DialogCardComponent {

  constructor(public dialogRef: MatDialogRef<DialogCardComponent>, @Inject(MAT_DIALOG_DATA) public dialog: DialogContent) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
