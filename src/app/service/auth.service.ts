import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://portfolio-michael-mena.koyeb.app';
  // private apiUrl = 'http://localhost:5000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {username, password}, this.httpOptions);
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
