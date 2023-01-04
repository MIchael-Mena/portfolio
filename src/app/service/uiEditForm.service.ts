import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Experience } from '../components/Experience';

@Injectable({
  providedIn: 'root'
})
export class UiEditFormService {

  private subject = new Subject<Experience>();
 
  constructor() { }

  toggleEdit( experience : Experience  ): void {
    this.subject.next(experience);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
