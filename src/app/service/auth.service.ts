import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';
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

  logout(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout?userId=${userId.toString()}`);
  }

}
