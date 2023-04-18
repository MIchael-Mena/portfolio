import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../components/shared/User";

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageSessionService {

  private behaviorSubject = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor() {
  }

  public onToggleSignUp(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public saveUser(user: any): void {
    this.behaviorSubject.next(true);

    localStorage.setItem('isLogged', 'true');

    /*    window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));*/

    /*    localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.accessToken);*/
  }

  public get isLoggedIn(): boolean {
    // return (localStorage.getItem('token') !== null);
    // return window.sessionStorage.getItem(USER_KEY) !== null;
    return localStorage.getItem('isLogged') === 'true';
  }

  public get token(): string {
    return localStorage.getItem('token') || '';
  }

  public cleanUser(): void {
    this.behaviorSubject.next(false);
    localStorage.removeItem('isLogged');
    localStorage.setItem('isLogged', 'false');
    // window.sessionStorage.removeItem(USER_KEY);

    /*    localStorage.removeItem('user');
        localStorage.removeItem('token');*/
  }
}
