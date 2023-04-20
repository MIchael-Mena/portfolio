import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ApiKey, User} from "../components/shared/User";

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageSessionService {

  private user: User | null = null;
  private behaviorSubject = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor() {
  }

  public onToggleSignUp(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public saveUser(user: User): void {
    this.user = user;
    this.behaviorSubject.next(true);
    localStorage.setItem('isLogged', 'true');

    /*    window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));*/

    /*    localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.accessToken);*/
  }

  get currentUser(): User | null {
    return this.user;
  }

  public getApiKey(apiName: string): string {
    let api = <ApiKey>{name: '', apiKey: ''};
    if (this.user) {
      api = this.user.apiKeys.find((key: ApiKey) => key.name === apiName) || <ApiKey>{name: '', apiKey: ''};
    }
    return api.apiKey;
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
    this.user = null;
    this.behaviorSubject.next(false);
    localStorage.setItem('isLogged', 'false');
    // window.sessionStorage.removeItem(USER_KEY);

    /*    localStorage.removeItem('user');
        localStorage.removeItem('token');*/
  }
}
