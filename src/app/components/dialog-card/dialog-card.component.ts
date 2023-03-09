import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogContent} from "./DialogContent";
import {ModalResponse} from "../shared/ModalResponse";

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.css']
})
export class DialogCardComponent {

  public isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogCardComponent>, @Inject(MAT_DIALOG_DATA) public dialog: DialogContent) {
  }

  onClose(): void {
    if (this.dialog.payload !== undefined) {
      this.isLoading = true;
      this.dialog.payload().subscribe({
        next: (result) => {
          this.isLoading = false;
          this.dialogRef.close(<ModalResponse>{
            state: true,
            content: result,
          });
        },
        error: (err) => {
          this.isLoading = false;
          // Delego la gestión de errores al componente que llama al diálogo
          this.dialogRef.close(<ModalResponse>{
            state: false,
            error: err,
          });
        }
      });
    } else {
      this.dialogRef.close(true);
    }
  }

}
