import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experience } from '../components/Experience';
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
  private apiUrl = 'http://localhost:5000/Experiences';
  
  constructor(private http: HttpClient) { }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, experience, httpOptions);
  }

  deleteExperience(experience: Experience): Observable<Experience> {
    const url = `${this.apiUrl}/${experience.id}`;
    return this.http.delete<Experience>(url)
  }

/*   updateTaskReminder(task: Experience): Observable<Experience> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Experience>(url, task, httpOptions);
  } */

/*   addTask(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, experience, httpOptions);
  } */

}
