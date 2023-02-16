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

  onClose(): void {
    if (this.dialog.payload !== undefined) {
      this.dialog.payload().subscribe({
        next: (result) => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          this.dialogRef.close(false);
        }
      });
    } else {
      this.dialogRef.close(true);
    }
  }

}
