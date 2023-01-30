import {Component, EventEmitter, Output} from '@angular/core';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {ExperienceData} from '../interfaces/ExperienceData';
import {MatDialog} from "@angular/material/dialog";

import {Input} from '@angular/core';
import {DialogDeleteCardComponent} from "../dialog-delete-card/dialog-delete-card.component";
import {StorageSessionService} from "../../service/storage-session.service";

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

  constructor(private dialog: MatDialog, public storageService: StorageSessionService) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  deleteExperience() {
    this.onDeleteExperience.emit(this.experience);
  }

  editExperience() {
    this.onEditExperience.emit(this.experience);
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogDeleteCardComponent, {
      data: {deleteExperience: false},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      // result es el valor de la propiedad data del dialog
      if (result) {
        this.deleteExperience();
      }
    });

  }
}
