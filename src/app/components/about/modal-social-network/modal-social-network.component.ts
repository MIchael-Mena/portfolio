import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SocialNetwork} from "../social-network/SocialNetwork";
import {ModalResponse} from "../../shared/ModalResponse";
import {ButtonSettings} from "../../shared/button-confirm/ButtonSettings";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionForShipment} from "../../shared/ActionForShipment";

@Component({
  selector: 'app-modal-social-network',
  templateUrl: './modal-social-network.component.html',
  styleUrls: ['./modal-social-network.component.css']
})
export class ModalSocialNetworkComponent {

  public form: FormGroup;
  public preview: string | null = null;
  public iconHasRequiredError: boolean = false;
  public isLoading: boolean = false;
  public buttonSettings: ButtonSettings = <ButtonSettings>{
    onConfirmText: 'Guardar',
    onWaitingText: 'Guardando...',
    color: 'primary'
  }
  private positionInitial: number;

  constructor(public dialogRef: MatDialogRef<ModalSocialNetworkComponent>,
              @Inject(MAT_DIALOG_DATA) public action: ActionForShipment,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      link: ['', [Validators.required, Validators.maxLength(100), this.ValidEmailOrLink(),]],
      icon: ['', Validators.required],
      // Si es un nuevo registro, la posición será la última posición + 1, que ya está
      // incluida en el array se remplaza en setDataToForm si es un registro existente
      position: [action.positions.length],
    });
    this.positionInitial = action.positions.length;
    action.setDataToForm((social: SocialNetwork) => {
      this.form.patchValue(social);
      this.preview = social.icon;
      this.positionInitial = social.position;
    });
  }

  private ValidEmailOrLink() {
    return (control: FormControl): { [key: string]: any } | null => {
      const link: string = control.value;
      const isEmail = link.indexOf('@') > 0;
      const isLink = link.indexOf('http') > -1;
      if (link && !isEmail && !isLink) {
        return {'emailOrLinkInvalid': true};
      }
      return null;
    }
  }

  public onSubmit(): void {
    // console.log(this.form.value)
    if (this.form.valid) {
      this.isLoading = true;
      this.verifyLink();
      this.action.onAction(this.form.value as SocialNetwork).subscribe({
          next: (response: SocialNetwork) => {
            this.isLoading = false;
            this.action.updatePosition(this.idIsNew(), response.position, this.positionInitial);
            this.dialogRef.close(<ModalResponse>{
                state: true,
                content: response,
              }
            );
          },
          error: (error: any) => {
            if (error.status !== 401) {
              alert(`Error al ${this.action.action.toLowerCase()} la red social`);
            } else {
              this.dialogRef.close(<ModalResponse>{
                  state: false,
                  content: error,
                }
              );
              this.isLoading = false;
            }
          }
        }
      )
    } else if (this.form.controls['icon'].hasError('required')) {
      this.iconHasRequiredError = true;
    }
  }

  private idIsNew(): boolean {
    return this.form.controls['id'].value === null;
  }

  public onClose(): void {
    this.dialogRef.close(<ModalResponse>{
        state: false,
      }
    );
  }

  private verifyLink(): void {
    const link = this.form.controls['link'].value;
    if (link.includes('@') && !link.includes('mailto:')) {
      this.form.controls['link'].setValue(`mailto:${link}`);
    }
  }

  public setSvg(svg: string): void {
    this.form.controls['icon'].setValue(svg);
  }

}
