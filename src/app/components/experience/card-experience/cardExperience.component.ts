import {Component, EventEmitter, Output} from '@angular/core';
import {ExperienceData} from '../ExperienceData';
import {MatDialog} from "@angular/material/dialog";

import {Input} from '@angular/core';
import {StorageSessionService} from "../../../service/storage-session.service";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {DialogContent} from "../../dialog-card/DialogContent";
import {Observable} from "rxjs";
import {ExperienceService} from "../service/experience.service";
import {ModalResponse} from "../../shared/ModalResponse";

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

  constructor(private dialog: MatDialog, public storageService: StorageSessionService,
              private experienceService: ExperienceService) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  public deleteExperience(): Observable<ExperienceData> {
    return this.experienceService.deleteExperience(this.experience);
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
      maxWidth: '95vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.onDeleteExperience.emit(this.experience);
      } else if (result.error) {
        alert('Error al eliminar la tarjeta');
      }
    });

  }
}
