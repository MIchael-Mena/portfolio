import {Component} from '@angular/core';
import {Education} from "../Education";
import {Work} from "../Work";
import {UnsavedChangesService} from "../../../service/unsaved-changes.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {firstValueFrom} from "rxjs";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {StorageSessionService} from "../../../service/storage-session.service";

@Component({
  selector: 'app-experience-and-education',
  templateUrl: './experience-and-education.component.html',
  styleUrls: ['./experience-and-education.component.css']
})
export class ExperienceAndEducationComponent {
  public canDeactivate: () => Promise<boolean> = () => this.canDeactivateForm();
  private formEducationIsEmpty = false;
  private formWorkIsEmpty = false;
  public education = new Education()
  public work = new Work()
  public isLoggedIn: boolean = false;
  private actualTab = 0;
  public activeTab: boolean[] = [true, false, false];
  public tabs = [
    {label: 'Educación', icon: 'school'},
    {label: 'Idiomas', icon: 'language'},
    {label: 'Experiencia', icon: 'work'},
  ];

  constructor(private unsavedChanges: UnsavedChangesService, private dialog: MatDialog,
              private storageService: StorageSessionService) {
    this.storageService.onToggleSignUp().subscribe((result: boolean) => {
      this.isLoggedIn = result;
    });
  }

  public tabChanged(tavEvent: MatTabChangeEvent): void {
    // Todavía no utilizo la segunda posición del array '1' en su lugar está el botón de agregar
    this.actualTab = tavEvent.index;
    this.markTabAsActive();
  }

  private markTabAsActive(): void {
    switch (this.actualTab) {
      case 0:
        this.activeTab = [true, false, false];
        break;
      case 2:
        this.activeTab = [false, false, true];
        break;
    }
  }

  public addEducation(): void {
    this.education.toggleAdd()
  }

  public add(): void {
    switch (this.actualTab) {
      case 0:
        this.addEducation();
        break;
      case 2:
        this.addWork();
    }
  }

  public addWork(): void {
    this.work.toggleAdd()
  }

  private async canDeactivateForm(): Promise<boolean> {
    const formState = (state: boolean, formName: string) => this.setFormIsEmpty(state, formName);
    this.unsavedChanges.emitCanDismissChanges(formState);
    if (!(this.formEducationIsEmpty && this.formWorkIsEmpty)) {
      return await this.OpenDiscardChangesDialog();
    } else {
      return true;
    }
  }

  private async OpenDiscardChangesDialog(): Promise<boolean> {
    const formWithUnsavedChanges = this.checkFormsState();
    const data = <DialogContent>{
      title: 'Cambios sin guardar',
      message: `Tienes cambios sin guardar en el formulario de <strong>${formWithUnsavedChanges}</strong>.
                <br>
                Si continúas perderás los cambios.`,
      buttonCancel: 'Cancelar',
      buttonConfirm: 'Continuar',
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '400px',
      data,
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms'
    });
    return await firstValueFrom(dialogRef.afterClosed());
  }

  private checkFormsState() {
    let formWithUnsavedChanges;
    if (!this.formEducationIsEmpty && !this.formWorkIsEmpty) {
      formWithUnsavedChanges = 'Educación y Experiencia laboral';
    } else if (!this.formEducationIsEmpty) {
      formWithUnsavedChanges = 'Educación';
    } else if (!this.formWorkIsEmpty) {
      formWithUnsavedChanges = 'Experiencia laboral';
    }
    return formWithUnsavedChanges;
  }

  private setFormIsEmpty(state: boolean, formName: string): void {
    switch (formName) {
      case 'education':
        this.formEducationIsEmpty = state;
        break;
      case 'work':
        this.formWorkIsEmpty = state;
        break;
    }
  }
}
