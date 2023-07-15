import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseURL + '/auth';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {username, password}, httpOptions);
  }

  register(email: string, password: string, userName: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {email, password, userName, name});
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  getAuthUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/details`);
  }

  refreshToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/refresh-token`);
  }

}
