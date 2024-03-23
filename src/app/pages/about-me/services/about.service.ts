import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutMeData } from '../models/AboutMeData';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = environment.backendURL + '/aboutMe';
  private update = '/update';

  constructor(private http: HttpClient) {}

  get aboutMe(): Observable<AboutMeData> {
    return this.http.get<AboutMeData>(this.apiUrl);
  }

  public updateAboutMe(aboutMe: AboutMeData): Observable<AboutMeData> {
    return this.http.put<AboutMeData>(
      this.apiUrl + this.update,
      aboutMe,
      httpOptions
    );
  }

  public updateTitle(title: string): Observable<AboutMeData> {
    return this.http.patch<AboutMeData>(
      this.apiUrl + this.update,
      { title },
      httpOptions
    );
  }

  public updateDescription(description: string): Observable<AboutMeData> {
    return this.http.patch<AboutMeData>(
      this.apiUrl + this.update,
      { description },
      httpOptions
    );
  }

  public updateName(name: string): Observable<AboutMeData> {
    return this.http.patch<AboutMeData>(
      this.apiUrl + this.update,
      { name },
      httpOptions
    );
  }

  updatePhoto(photo: string): Observable<AboutMeData> {
    return this.http.patch<AboutMeData>(
      this.apiUrl + this.update,
      { photo },
      httpOptions
    );
  }
}
