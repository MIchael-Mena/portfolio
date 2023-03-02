import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AboutMeData} from "../components/shared/AboutMeData";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private apiUrl = 'http://localhost:5000/AboutMe';

  constructor(private http: HttpClient) {
  }

  get data(): Observable<AboutMeData> {
    return this.http.get<AboutMeData>(this.apiUrl);
  }

  public update(aboutMe: AboutMeData, token: String): Observable<AboutMeData> {
    // const url = `${this.apiUrl}/${aboutMe.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<AboutMeData>(this.apiUrl, aboutMe, httpOptions);
  }

  public saveImg(img: string, token: String): Observable<string> {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(this.apiUrl + '/img', img, httpOptions);
  }

}
