import {Observable, Subject} from "rxjs";

export class ExperienceServiceForAdd {
  private subject = new Subject<boolean>();
  private state = false;

  onToggleAdd(): Observable<boolean> {
    return this.subject.asObservable();
  }

  toggleAdd(): void {
    this.state = !this.state;
    this.subject.next(this.state);
  }

}
