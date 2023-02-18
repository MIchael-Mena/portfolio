import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SkillData, IconData} from "../shared/SkillData";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../../service/skill.service";
import {StorageSessionService} from "../../service/storage-session.service";

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent {

  // @ts-ignore
  public form: FormGroup;
  private svg: IconData | null = null;
  // private fileSelected: File | null = null;
  public previewFileUrl: string | null = null;
  public isSvgError: boolean = true;
  public isEditing: boolean = false;
  public isThereAnIconError: boolean = true;
  public isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalSkillComponent>,
              @Inject(MAT_DIALOG_DATA) public skill: SkillData,
              private fb: FormBuilder,
              private skillService: SkillService,
              private storageSession: StorageSessionService) {
    if (skill) {
      this.loadForm(skill);
      this.isEditing = true;
      this.svg = skill.icon;
      this.previewSvgInBase64 = skill.icon.content;
    } else {
      this.loadForm({id: 0, name: '', level: 0, icon: {name: '', content: ''}});
      this.isEditing = false;
    }
  }

  private loadForm(skill: SkillData): void {
    this.form = this.fb.group({
      id: [skill.id],
      name: [skill.name, Validators.required],
      level: [skill.level, [Validators.max(5), Validators.min(0)]],
    });
  }

  public onFileSelected(event: any) {
    // TODO: SVG sin viewBox no se visualiza bien en mat-icon
    const file = <File>event.target.files[0];
    if (file.type === 'image/svg+xml') {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      // No hay await en el on load es un callback y se continúa la ejecución
      fileReader.onload = async e => {
        this.setUpFile(fileReader, file);
      }
      // Si uso readAsDataURL, me lo convierte a base64
      // fileReader.readAsDataURL(file);
      // this.fileSelected = file;
    } else {
      this.isSvgError = false;
    }
  }

  private setUpFile(fileReader: FileReader, file: File): void {
    const result = fileReader.result as string;
    if (this.checkMaliciousSvg(result)) {
      return;
    }
    this.svg = {
      name: file.name,
      content: result
    }
    this.previewSvgInBase64 = result;
    this.isThereAnIconError = true;
    this.isSvgError = true;
  }

  private checkMaliciousSvg(svg: string): boolean {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const script = doc.getElementsByTagName('script');
    if (script.length > 0) {
      // throw new Error('Malicious SVG');
      console.error('Malicious SVG');
      return true;
    }
    return false;
  }

  set previewSvgInBase64(svg: string) {
    this.previewFileUrl = 'data:image/svg+xml;base64,' + window.btoa(svg);
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onSubmit(): void {
    if (this.form.invalid || this.svg === null) {
      if (this.svg === null) this.isThereAnIconError = false;
      return;
    }
    // Usar FormData para enviar archivos y datos en un solo request (multipart/form-data)
    /*    const fd = new FormData();
        fd.append('id', this.form.value.id);
        fd.append('name', this.form.value.name);
        fd.append('level', this.form.value.level);
        fd.append('icon', this.fileSelected, this.fileSelected?.name);*/
    const skillData = this.setUpSkill();
    if (this.isEditing) {
      this.updateSkill(skillData);
    } else {
      this.addSkill(skillData);
    }
    // No es necesario resetear el formulario porque se cierra el modal
  }

  private addSkill(skillData: SkillData): void {
    this.isLoading = true;
    this.skillService.addSkill(skillData, this.storageSession.tokenValue).subscribe({
      next: (data: SkillData) => {
        // console.log(data);
        this.isLoading = false;
        this.dialogRef.close(data);
      },
      error: (error) => {
        // console.log(error);
        this.isLoading = false;
        this.dialogRef.close(false);
        alert('Error al añadir la skill');
      }
    });
  }

  private updateSkill(skillData: SkillData): void {
    this.isLoading = true;
    this.skillService.updateSkill(skillData, this.storageSession.tokenValue).subscribe({
      next: (data: SkillData) => {
        this.isLoading = false;
        this.dialogRef.close(data);
      },
      error: (error) => {
        // console.log(error);
        this.isLoading = false;
        this.dialogRef.close(false);
        alert('Error al actualizar la skill');
      }
    });
  }

  private setUpSkill(): SkillData {
    return <SkillData>{
      id: this.form.value.id,
      name: this.form.value.name,
      level: this.form.value.level,
      icon: this.svg
    }
  }

  public deleteIcon(): void {
    this.svg = null;
    this.previewFileUrl = null;
    this.isThereAnIconError = false;
  }

}
