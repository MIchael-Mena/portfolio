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

  // private apiUrl = 'http://localhost:5000/Skills';
  private apiUrl = 'http://localhost:8080/skills';

  constructor(private http: HttpClient) {
  }

  get skills(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(this.apiUrl);
  }

  get SkillsOrder(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(`${this.apiUrl}?_sort=position&_order=asc`);
  }

  public addSkill(skill: SkillData): Observable<any> {
    // usar si skill es un FormData
    // ('Content-Type', 'multipart/form-data') o ('Content-Type', 'application/x-www-form-urlencoded');
    // httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<SkillData>(this.apiUrl + '/create', skill, httpOptions);
  }

  public deleteSkill(skill: SkillData): Observable<SkillData> {
    const url = `${this.apiUrl}/delete/${skill.id}`;
    return this.http.delete<SkillData>(url, httpOptions);
  }

  public updateSkill(skill: SkillData): Observable<SkillData> {
    const url = `${this.apiUrl}/edit/${skill.id}`;
    return this.http.put<SkillData>(url, skill, httpOptions);
  }

  public updatePosition(id: number, position: number): Observable<SkillData> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.patch<SkillData>(url, {position}, httpOptions);
  }

}
