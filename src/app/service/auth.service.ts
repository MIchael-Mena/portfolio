import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = 'http://localhost:5000';
  private token: string = ''

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    this.http.post(`${this.uri}/login`, {email, password})
      .subscribe((res: any) => {
        this.token = res['accessToken'];
        localStorage.setItem('token', this.token);
        this.router.navigate(['/']).then(r => console.log(r));
      });
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.setItem('token', this.token)
    this.router.navigate(['/login']).then(r => console.log(r));
  }

  public get isLogged(): boolean {
    return (localStorage.getItem('token') !== '');
  }

  public get tokenValue(): string {
    return localStorage.getItem('token') || '';
  }
}
