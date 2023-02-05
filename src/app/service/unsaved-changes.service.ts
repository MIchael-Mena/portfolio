import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesService {

  private subject = new Subject();

  constructor() {
  }

  emitCanDismissChanges(value: any): void {
    this.subject.next(value);
  }

  onDismissChanges(): Observable<any> {
    return this.subject.asObservable();
  }

}
