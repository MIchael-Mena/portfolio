import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // TODO: Si tuviera muchos spinner lo mejor sería crear más servicios para cada uno de ellos

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

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
