import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:5000';
  token: string = ''

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    this.http.post(`${this.uri}/login`, {email, password})
      .subscribe((res: any) => {
        this.token = res['accessToken'];
        localStorage.setItem('token', this.token);
        this.router.navigate(['/']).then(r => console.log(r));
        console.log(this.logIn);
      });
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.setItem('token', this.token)
    this.router.navigate(['/login']).then(r => console.log(r));
  }

  public get logIn(): boolean {
    console.log(localStorage.getItem('token'));
    return (localStorage.getItem('token') !== '');
  }
}
