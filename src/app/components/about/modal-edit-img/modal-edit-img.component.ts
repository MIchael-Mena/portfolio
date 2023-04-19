import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditField} from "../EditField";
import {ButtonSettings} from "../../shared/button-confirm/ButtonSettings";
import {ModalResponse} from "../../shared/ModalResponse";

const preview = 'assets/icon/png/profile-preview-alt.jpg';

@Component({
  selector: 'app-modal-edit-img',
  templateUrl: './modal-edit-img.component.html',
  styleUrls: ['./modal-edit-img.component.css']
})
export class ModalEditImgComponent {

  public previewFileUrl: string = preview;
  public isValidFormat: boolean = true;
  public imgHasRequiredError: boolean = false;
  public isLoading: boolean = false;
  public buttonSettings: ButtonSettings = <ButtonSettings>{
    onConfirmText: 'Guardar',
    onWaitingText: 'Guardando...',
  }

  constructor(public dialogRef: MatDialogRef<ModalEditImgComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditField) {
    this.previewFileUrl = this.data.content;
  }

  public onClose(): void {
    this.dialogRef.close(<ModalResponse>{
        state: false,
      }
    );
  }

  public onFileSelected(event: any) {
    const file = <File>event.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = async e => {
        this.setUpFile(fileReader, file);
      }
    } else {
      this.isValidFormat = false;
    }
  }

  private setUpFile(fileReader: FileReader, file: File) {
    this.previewFileUrl = fileReader.result as string;
    this.isValidFormat = true;
  }

  public saveImg(): void {
    this.imgHasRequiredError = false;
    if (this.previewFileUrl === preview) {
      this.imgHasRequiredError = true;
      return;
    }
    this.isLoading = true;
    this.data.update(this.previewFileUrl).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close({state: true, content: this.previewFileUrl});
      },
      error: (error) => {
        this.isLoading = false;
        alert('Error al guardar la imagen');
      }
    });
  }

}
