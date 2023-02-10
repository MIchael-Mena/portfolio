import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillData} from "../components/shared/SkillData";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private apiUrl = 'http://localhost:5000/Skills';

  constructor(private http: HttpClient) {
  }

  get skills(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(this.apiUrl);
  }

  addSkill(skill: SkillData, token: String): Observable<SkillData> {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<SkillData>(this.apiUrl, skill, httpOptions);
  }

  deleteSkill(skill: SkillData, token: String): Observable<SkillData> {
    const url = `${this.apiUrl}/${skill.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete<SkillData>(url, httpOptions);
  }

}
