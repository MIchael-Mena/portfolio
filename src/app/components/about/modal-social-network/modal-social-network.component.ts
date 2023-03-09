import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SocialNetwork} from "../social-network/SocialNetwork";
import {ModalResponse} from "../../shared/ModalResponse";
import {ButtonSettings} from "../../shared/button-confirm/ButtonSettings";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  }

  constructor(public dialogRef: MatDialogRef<ModalSocialNetworkComponent>,
              @Inject(MAT_DIALOG_DATA) public action: ActionForShipment,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      link: ['', Validators.required],
      icon: ['', Validators.required],
    });
    action.setDataToForm((social: SocialNetwork) => {
      this.form.patchValue(social);
      this.preview = social.icon;
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.action.onAction(this.form.value as SocialNetwork).subscribe({
          next: (response: SocialNetwork) => {
            this.isLoading = false;
            this.dialogRef.close(<ModalResponse>{
                state: true,
                content: response,
              }
            );
          },
          error: (error: any) => {
            alert(`Error al ${this.action.action.toLowerCase()} la red social`);
            this.isLoading = false;
          }
        }
      )
    } else {
      this.iconHasRequiredError = true;
    }
  }

  public onClose(): void {
    this.dialogRef.close(<ModalResponse>{
        state: false,
      }
    );
  }

  public setSvg(svg: string): void {
    this.form.controls['icon'].setValue(svg);
  }

}
