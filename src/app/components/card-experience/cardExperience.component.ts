import {Component, EventEmitter, Output} from '@angular/core';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {ExperienceData} from '../shared/ExperienceData';
import {MatDialog} from "@angular/material/dialog";

import {Input} from '@angular/core';
import {StorageSessionService} from "../../service/storage-session.service";
import {DialogCardComponent} from "../dialog-card/dialog-card.component";
import {DialogContent} from "../shared/DialogContent";
import {Observable} from "rxjs";
import {ExperienceService} from "../../service/experience.service";

@Component({
  selector: 'app-card-experience',
  templateUrl: './cardExperience.component.html',
  styleUrls: ['./cardExperience.component.css']
})
export class CardExperienceComponent {
  @Input() experience!: ExperienceData;
  @Output() onDeleteExperience: EventEmitter<ExperienceData> = new EventEmitter();
  @Output() onEditExperience: EventEmitter<ExperienceData> = new EventEmitter();

  public isLoggedIn: boolean = false;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  constructor(private dialog: MatDialog, public storageService: StorageSessionService,
              private experienceService: ExperienceService) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  public deleteExperience(): Observable<ExperienceData> {
    return this.experienceService.deleteExperience(this.experience, this.storageService.tokenValue);
  }

  editExperience() {
    this.onEditExperience.emit(this.experience);
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const data = <DialogContent>{
      payload: () => this.deleteExperience(),
      title: 'Eliminar tarjeta',
      message: '¿Estás seguro de que quieres eliminar esta tarjeta?',
      buttonCancel: 'Cancelar',
      buttonConfirm: 'Eliminar',
      buttonConfirmLoading: 'Eliminando...',
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.onDeleteExperience.emit(this.experience);
      } else if (result.error) {
        alert('Error al eliminar la tarjeta');
      }
    });

  }
}
