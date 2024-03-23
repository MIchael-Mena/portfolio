import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ExperienceData } from '../models/ExperienceData';

@Injectable({
  providedIn: 'root',
})
export class UiEditFormService {
  private subject = new Subject<ExperienceData>();

  constructor() {}

  toggleEdit(experience: ExperienceData): void {
    this.subject.next(experience);
  }

  onToggle(): Observable<ExperienceData> {
    return this.subject.asObservable();
  }
}
