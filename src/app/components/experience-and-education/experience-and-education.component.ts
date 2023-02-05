import {Component} from '@angular/core';
import {Education} from "../shared/Education";
import {Work} from "../shared/Work";
import {UnsavedChangesService} from "../../service/unsaved-changes.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogContent} from "../shared/DialogContent";
import {DialogCardComponent} from "../dialog-card/dialog-card.component";
import {firstValueFrom} from "rxjs";

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

  constructor(private unsavedChanges: UnsavedChangesService, private dialog: MatDialog) {
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
    const formWithSavedChanges = !this.formEducationIsEmpty ? 'Educación' : 'Experiencia laboral';
    const [enterAnimationDuration, exitAnimationDuration] = [200, 100];
    const data = <DialogContent>{
      title: 'Cambios sin guardar',
      content: `Tienes cambios sin guardar en el formulario de <strong>${formWithSavedChanges}</strong>.\n` +
        `Si continúas perderás los cambios.`,
      buttonCancel: 'Cancelar',
      buttonAccept: 'Continuar',
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '400px',
      data,
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    const test = await firstValueFrom(dialogRef.afterClosed());
    // result puede ser undefined
    return test ? true : false;
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
