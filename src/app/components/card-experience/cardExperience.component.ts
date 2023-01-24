import {Component, EventEmitter, Output} from '@angular/core';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {ExperienceData} from '../interfaces/ExperienceData';
import {MatDialog} from "@angular/material/dialog";

import {Input} from '@angular/core';
import {DialogDeleteCardComponent} from "../dialog-delete-card/dialog-delete-card.component";

@Component({
  selector: 'app-card-experience',
  templateUrl: './cardExperience.component.html',
  styleUrls: ['./cardExperience.component.css']
})
export class CardExperienceComponent {
  @Input() experience!: ExperienceData;
  @Output() onDeleteExperience: EventEmitter<ExperienceData> = new EventEmitter();
  @Output() onEditExperience: EventEmitter<ExperienceData> = new EventEmitter();
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  constructor(public dialog: MatDialog) {
  }

  deleteExperience() {
    this.onDeleteExperience.emit(this.experience);
  }

  editExperience(experience: ExperienceData) {
    this.onEditExperience.emit(experience);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogDeleteCardComponent, {
      data: {deleteExperience: false},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.deleteExperience();
      }
    });

  }
}
