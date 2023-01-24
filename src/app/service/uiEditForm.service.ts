import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ExperienceData } from '../components/interfaces/ExperienceData';

@Injectable({
  providedIn: 'root'
})
export class UiEditFormService {

  private subject = new Subject<ExperienceData>();
 
  constructor() { }

  toggleEdit( experience : ExperienceData  ): void {
    this.subject.next(experience);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
