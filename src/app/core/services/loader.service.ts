import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private behaviorSubject = new BehaviorSubject<boolean>(false);
  private loading: boolean = false;

  constructor() {
  }

  public onToggleLoading(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public toggleLoad(statusLoading: boolean) {
    this.behaviorSubject.next(statusLoading);
  }
}
