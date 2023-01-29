import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.uri}/login`, {email, password});
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.uri}/register`, {email, password});
  }

  logout() {

  }

}
