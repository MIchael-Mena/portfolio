import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditData} from "../EditData";

@Component({
  selector: 'app-modal-social-media',
  templateUrl: './modal-social-media.component.html',
  styleUrls: ['./modal-social-media.component.css']
})
export class ModalSocialMediaComponent {

  public previewFileUrl: string = '';
  public isValidFormat: boolean = true;
  public hasRequiredError: boolean = false;
  public isWaitingResponse: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalSocialMediaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditData) {
  }

  public onFileSelected(event: any): void {
  }

  public save(): void {

  }


}
