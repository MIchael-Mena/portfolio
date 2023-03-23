import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ExperienceData} from '../ExperienceData';
import {Observable} from 'rxjs';
import {WorkData} from "../WorkData";
import {EducationData} from "../EducationData";

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

  private apiUrl = 'http://localhost:5000/Works';

  constructor(private http: HttpClient) {
  }

  getExperiences(): Observable<WorkData[] | EducationData[]> {
    return this.isWorkingDatabase ? this.http.get<WorkData[]>(this.apiUrl) : this.http.get<EducationData[]>(this.apiUrl);
  }

  addExperience(experience: WorkData | EducationData, token: String): Observable<WorkData | EducationData> {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<WorkData | EducationData>(this.apiUrl, experience, httpOptions);
  }

  deleteExperience(experience: ExperienceData, token: String): Observable<ExperienceData> {
    const url = `${this.apiUrl}/${experience.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete<ExperienceData>(url, httpOptions);
  }

  updateExperience(experience: WorkData | EducationData, token: String): Observable<WorkData | EducationData> {
    const url = `${this.apiUrl}/${experience.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<WorkData | EducationData>(url, experience, httpOptions);
  }

  useWorkingDatabase() {
    this.apiUrl = 'http://localhost:5000/Works';

  }

  useEducationDatabase() {
    this.apiUrl = 'http://localhost:5000/Educations';
  }

}
