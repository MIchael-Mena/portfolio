import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalResponse} from "../../shared/ModalResponse";
import {ButtonSettings} from "../../shared/button-confirm/ButtonSettings";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {SkillData} from "../SkillData";

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent {

  public form: FormGroup;
  public preview: string | null = null;
  public iconHasRequiredError: boolean = false;
  public isLoading: boolean = false;
  public buttonSettings: ButtonSettings = <ButtonSettings>{
    onConfirmText: 'Guardar',
    onWaitingText: 'Guardando...',
  }
  private positionInitial: number;

  constructor(public dialogRef: MatDialogRef<ModalSkillComponent>,
              @Inject(MAT_DIALOG_DATA) public action: ActionForShipment,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      level: [0, [Validators.max(5), Validators.min(0)]],
      icon: ['', Validators.required],
      position: [action.positions.length],
    });
    this.positionInitial = action.positions.length;
    action.setDataToForm((skill: SkillData) => {
      this.form.patchValue(skill);
      this.preview = skill.icon;
      this.positionInitial = skill.position;
    });
  }

  public setSvg(svg: string): void {
    this.form.controls['icon'].setValue(svg);
  }

  public onClose(): void {
    this.dialogRef.close(<ModalResponse>{state: false});
  }

  private idIsNew(): boolean {
    return this.form.controls['id'].value === null;
  }

  public onSubmit(): void {
    // Usar FormData para enviar archivos y datos en un solo request (multipart/form-data)
    /*    const fd = new FormData();
        fd.append('id', this.form.value.id);
        fd.append('name', this.form.value.name);
        fd.append('level', this.form.value.level);
        fd.append('icon', this.fileSelected, this.fileSelected?.name);*/
    if (this.form.valid) {
      this.isLoading = true;
      this.action.onAction(this.form.value as SkillData).subscribe({
          next: (response: SkillData) => {
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
              alert(`Error al ${this.action.action.toLowerCase()} la habilidad`);
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
    } else {
      this.iconHasRequiredError = true;
    }
  }

}
