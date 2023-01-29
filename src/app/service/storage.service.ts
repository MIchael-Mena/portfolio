import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public saveUser(data: any): void {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.accessToken);
  }

  public get isLogged(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  public get tokenValue(): string {
    return localStorage.getItem('token') || '';
  }

  public get userValue(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public cleanUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
