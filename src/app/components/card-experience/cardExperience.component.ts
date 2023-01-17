import { Component, EventEmitter, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Experience } from '../interfaces/Experience';

import { Input } from '@angular/core';

@Component({
  selector: 'app-card-experience',
  templateUrl: './cardExperience.component.html',
  styleUrls: ['./cardExperience.component.css']
})
export class CardExperienceComponent {
  @Input() experience!: Experience;
  @Output() onDeleteExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onEditExperience: EventEmitter<Experience> = new EventEmitter();
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  constructor() { }

  deleteExperience(experience: Experience) {
    this.onDeleteExperience.emit(experience);
  }

  editExperience(experience: Experience) {
    this.onEditExperience.emit(experience);
  }
}
