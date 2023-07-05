import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillData} from "../SkillData";
import {Observable} from "rxjs";
import {environment} from "../../../../enviroment/enviroment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = environment.baseURL + '/skills';

  constructor(private http: HttpClient) {
  }

  get skills(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(this.apiUrl);
  }

  get SkillsOrder(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(`${this.apiUrl}?_sort=position&_order=asc`);
  }

  get SkillNames(): Observable<{ name: string }[]> {
    // Devuelve un array de la forma: [{name: 'skill1'}, {name: 'skill2'}, ...]
    return this.http.get<{ name: string }[]>(`${this.apiUrl}/names`);
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
