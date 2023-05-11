import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonSettings} from "../../shared/button-confirm/ButtonSettings";
import {ModalResponse} from "../../shared/ModalResponse";
import {Image, ProjectData} from "../projects/ProjectData";
import {SkillService} from "../../skill/service/skill.service";

@Component({
  selector: 'app-modal-project',
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.css']
})
export class ModalProjectComponent implements OnInit {

  public images: Image[] = [];
  public skillNames: string[] = [];
  public technologies: string[] = [];
  public form: FormGroup;
  public isLoading: boolean = false;
  public buttonSettings: ButtonSettings = <ButtonSettings>{
    onConfirmText: 'Guardar',
    onWaitingText: 'Guardando...',
    color: 'primary'
  }
  public imageRequired: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalProjectComponent>,
              private skillsService: SkillService,
              @Inject(MAT_DIALOG_DATA) public action: ActionForShipment,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      link: [''],
      githubLink: [''],
      date: ['', Validators.required]
    });
    action.setDataToForm((project: ProjectData) => {
      this.technologies = project.technologies.slice();
      this.images = project.images.slice();
      this.form.patchValue(project);
    });
  }

  ngOnInit(): void {
    this.skillsService.SkillNames.subscribe((skills: { name: string } []) => {
      this.skillNames = skills.map(skill => skill.name);
    });
  }

  public onClose(): void {
    // TODO: eliminar las imágenes subidas
    this.dialogRef.close(<ModalResponse>{state: false});
  }

  public onSubmit(): void {
    this.isLoading = true;
    if (this.form.invalid || this.images.length === 0) {
      this.imageRequired = this.images.length === 0;
      console.log(this.imageRequired);
      this.isLoading = false;
      return;
    }
    const project = this.prepareProject();
    this.action.onAction(project).subscribe({
      next: (response: ProjectData) => {
        this.dialogRef.close(<ModalResponse>{state: true, content: response});
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        alert('Ha ocurrido un error al guardar el proyecto');
        console.log(error);
      }
    });
  }

  private prepareProject(): ProjectData {
    return <ProjectData>{
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      link: this.form.get('link')?.value,
      githubLink: this.form.get('githubLink')?.value,
      date: this.formatDate,
      technologies: this.technologies,
      images: this.images
    }
  }

  private get formatDate(): string {
    const date = this.form.get('date')?.value;
    return (typeof date === 'string') ? date : date.format('YYYY-MM-DD');
  }


}
