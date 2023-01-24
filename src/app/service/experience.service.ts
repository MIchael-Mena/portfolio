import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExperienceData } from '../components/interfaces/ExperienceData';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  // Experiences is the name of the controller in the backend or fake backend
  private apiUrl = 'http://localhost:5000/Works';

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<ExperienceData[]> {
    return this.http.get<ExperienceData[]>(this.apiUrl);
  }

  addExperience(experience: ExperienceData): Observable<ExperienceData> {
    return this.http.post<ExperienceData>(this.apiUrl, experience, httpOptions);
  }

  deleteExperience(experience: ExperienceData): Observable<ExperienceData> {
    const url = `${this.apiUrl}/${experience.id}`;
    return this.http.delete<ExperienceData>(url)
  }

  updateExperience(experience: ExperienceData): Observable<ExperienceData> {
    const url = `${this.apiUrl}/${experience.id}`;
    return this.http.put<ExperienceData>(url, experience, httpOptions);
  }

  useWorkingDatabase() {
    this.apiUrl = 'http://localhost:5000/Works';
  }

  useEducationDatabase() {
    this.apiUrl = 'http://localhost:5000/Educations';
  }

}
