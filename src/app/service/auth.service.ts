import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = 'http://localhost:5000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.uri}/login`, {email, password}, this.httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.uri}/register`, {email, password});
  }

  logout() {

  }

}
