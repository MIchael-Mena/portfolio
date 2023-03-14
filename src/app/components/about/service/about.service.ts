import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AboutMeData} from "../AboutMeData";
import {SocialNetwork} from "../social-network/SocialNetwork";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  })
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private apiUrlAboutMe = 'http://localhost:5000/AboutMe';

  constructor(private http: HttpClient) {
  }

  get aboutMe(): Observable<AboutMeData> {
    return this.http.get<AboutMeData>(this.apiUrlAboutMe);
  }

  public updateAboutMe(aboutMe: AboutMeData, token: String): Observable<AboutMeData> {
    // const url = `${this.apiUrlAboutMe}/${aboutMe.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<AboutMeData>(this.apiUrlAboutMe, aboutMe, httpOptions);
  }

  /*
    public saveImg(img: string, token: String): Observable<string> {
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
      return this.http.post<string>(this.apiUrlAboutMe + '/img', img, httpOptions);
    }
  */

}
