import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ExperienceData} from '../ExperienceData';
import {Observable} from 'rxjs';
import {WorkData} from "../WorkData";
import {EducationData} from "../EducationData";
import {environment} from "../../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private isWorkingDatabase: boolean = true;

  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  get experiences(): Observable<WorkData[] | EducationData[]> {
    return this.isWorkingDatabase ? this.http.get<WorkData[]>(this.apiUrl) : this.http.get<EducationData[]>(this.apiUrl);
  }

  get expOrderByInitialDate(): Observable<WorkData[] | EducationData[]> {
    const url = this.apiUrl + '?_sort=initialDate&_order=desc';
    return this.isWorkingDatabase ? this.http.get<WorkData[]>(url) : this.http.get<EducationData[]>(url);
  }

  addExperience(experience: WorkData | EducationData): Observable<WorkData | EducationData> {
    return this.http.post<WorkData | EducationData>(this.apiUrl + '/create', experience, httpOptions);
  }

  deleteExperience(experience: ExperienceData): Observable<ExperienceData> {
    const url = `${this.apiUrl}/delete/${experience.id}`;
    return this.http.delete<ExperienceData>(url, httpOptions);
  }

  updateExperience(experience: WorkData | EducationData): Observable<WorkData | EducationData> {
    const url = `${this.apiUrl}/edit/${experience.id}`;
    return this.http.put<WorkData | EducationData>(url, experience, httpOptions);
  }

  useWorkingDatabase() {
    this.apiUrl = this.apiUrl + '/works';
  }

  useEducationDatabase() {
    this.apiUrl = this.apiUrl + '/educations';
  }

}
