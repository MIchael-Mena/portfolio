import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesService {

  private subject = new Subject();
  private componentsListened: Map<string, boolean> = new Map<string, boolean>();

  constructor() {
  }

  public onDismissChanges(): Observable<any> {
    return this.subject.asObservable();
  }

  public canDeactivate(): boolean {
    this.emitCanDismissUnsavedChanges();
    return Array.from(this.componentsListened.values()).every((value) => value);
  }

  private emitCanDismissUnsavedChanges(): void {
    this.subject.next((component: string, state: boolean) => {
      this.setComponentState(component, state);
    });
  }

  private setComponentState(componentName: string, state: boolean): void {
    this.componentsListened.set(componentName, state);
  }

}
