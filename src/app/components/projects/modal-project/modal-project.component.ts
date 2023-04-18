import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {FormBuilder, FormGroup} from "@angular/forms";
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
  public form: FormGroup;
  public isLoading: boolean = false;
  public buttonSettings: ButtonSettings = <ButtonSettings>{
    onConfirmText: 'Guardar',
    onWaitingText: 'Guardando...',
  }

  constructor(public dialogRef: MatDialogRef<ModalProjectComponent>,
              private skillsService: SkillService,
              @Inject(MAT_DIALOG_DATA) public action: ActionForShipment,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      link: [''],
      githubLink: [''],
      date: [''],
      technologies: [''],
    });
    action.setDataToForm((project: ProjectData) => {
      this.images = project.images;
      this.form.patchValue(project);
    });
  }

  ngOnInit(): void {
    this.skillsService.SkillNames.subscribe((skills: { name: string } []) => {
      this.skillNames = skills.map(skill => skill.name);
    });
  }

  public onClose(): void {
    this.dialogRef.close(<ModalResponse>{state: false});
  }

  public onSubmit(): void {

  }

  public updateImages(images: Image[]) {
    this.images = images;
  }

}
