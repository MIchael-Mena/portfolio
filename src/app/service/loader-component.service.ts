import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderComponentService {

  private behaviorSubject = new BehaviorSubject<boolean>(true);
  private loading: boolean = false;
  private componentsLoading: Map<string, boolean> = new Map<string, boolean>();

  constructor() {
  }

  public onToggleLoading(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public toggleLoad(statusLoading: boolean, component: string) {
    console.log('toggleLoad', statusLoading, component);
    this.componentsLoading.set(component, statusLoading);
  }

  private checkStatusComponents(): void {
    let loading = false;
    this.componentsLoading.forEach((value: boolean) => {
      if (value) {
        loading = true;
      }
    })
    if (loading !== this.loading) {
      this.loading = loading;
      this.behaviorSubject.next(loading);
    }
  }

}
