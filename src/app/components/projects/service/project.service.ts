import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ProjectData} from "../projects/ProjectData";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.backendURL + '/projects';

  constructor(private http: HttpClient) {
  }

  get projects(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>(this.apiUrl);
  }

  get projectsOrder(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>(`${this.apiUrl}?_sort=date&_order=desc`);
  }

  public addProject(project: ProjectData): Observable<any> {
    return this.http.post<ProjectData>(this.apiUrl + '/create', project, httpOptions);
  }

  public deleteProject(project: ProjectData): Observable<ProjectData> {
    const url = `${this.apiUrl}/delete/${project.id}`;
    return this.http.delete<ProjectData>(url, httpOptions);
  }

  public updateProject(project: ProjectData): Observable<ProjectData> {
    const url = `${this.apiUrl}/edit/${project.id}`;
    return this.http.put<ProjectData>(url, project, httpOptions);
  }

}
