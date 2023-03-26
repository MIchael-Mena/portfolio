import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SocialNetwork} from "../social-network/SocialNetwork";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {

  // private apiUrl= 'http://localhost:5000/SocialNetworks';
  private apiUrl = 'http://localhost:8080/socialNetworks';

  constructor(private http: HttpClient) {
  }

  get socialNetworks(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(this.apiUrl);
  }

  get socialNetworksOrder(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(`${this.apiUrl}?_sort=position&_order=asc`);
  }

  public updatePosition(id: number, position: number): Observable<SocialNetwork> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.patch<SocialNetwork>(url, {position}, httpOptions);
  }

  public update(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const url = `${this.apiUrl}/edit/${socialNetwork.id}`;
    return this.http.put<SocialNetwork>(url, socialNetwork, httpOptions);
  }

  public add(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<SocialNetwork>(url, socialNetwork, httpOptions);
  }

  public delete(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const url = `${this.apiUrl}/delete/${socialNetwork.id}`;
    return this.http.delete<SocialNetwork>(url, httpOptions);
  }

}
