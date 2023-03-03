import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillData} from "../SkillData";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = 'http://localhost:5000/Skills';

  constructor(private http: HttpClient) {
  }

  get skills(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(this.apiUrl);
  }

  public addSkill(skill: any, token: String): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    // usar si skill es un FormData
    // ('Content-Type', 'multipart/form-data') o ('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<any>(this.apiUrl, skill, httpOptions);
  }

  public deleteSkill(skill: SkillData, token: String): Observable<SkillData> {
    const url = `${this.apiUrl}/${skill.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete<SkillData>(url, httpOptions);
  }

  public updateSkill(skill: SkillData, token: String): Observable<SkillData> {
    const url = `${this.apiUrl}/${skill.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<SkillData>(url, skill, httpOptions);
  }

}
