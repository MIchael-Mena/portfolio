import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {StorageSessionService} from "../../../service/storage-session.service";
import {AboutService} from "../../../service/about.service";
import {EditData} from "../EditData";
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

  constructor(public dialogRef: MatDialogRef<ModalEditImgComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditData,
              private fb: FormBuilder,
              private aboutService: AboutService,
              private storageSession: StorageSessionService) {
    this.previewFileUrl = this.data.content;
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
        this.dialogRef.close({state: true, content: response.photo} as ModalResponse);
      },
      error: (error) => {
        this.isLoading = false;
        alert('Error al guardar la imagen');
      }
    });

    /*    this.aboutService.saveImg(this.previewFileUrl, this.storageSession.token).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.dialogRef.close();
          },
          error: (error) => {
            this.isLoading = false;
            alert('Error al guardar la imagen');
          }
        });*/

  }

}
