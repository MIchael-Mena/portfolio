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

  // private urlApi= 'http://localhost:5000/SocialNetworks';
  private urlApi = 'http://localhost:8080/socialNetworks';

  constructor(private http: HttpClient) {
  }

  get socialNetworks(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(this.urlApi);
  }

  get socialNetworksOrder(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(`${this.urlApi}?_sort=position&_order=asc`);
  }

  public updatePosition(id: number, position: number): Observable<SocialNetwork> {
    const url = `${this.urlApi}/update/${id}`;
    return this.http.patch<SocialNetwork>(url, {position}, httpOptions);
  }

  public update(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const url = `${this.urlApi}/edit/${socialNetwork.id}`;
    return this.http.put<SocialNetwork>(url, socialNetwork, httpOptions);
  }

  public add(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const url = `${this.urlApi}/create`;
    return this.http.post<SocialNetwork>(url, socialNetwork, httpOptions);
  }

  public delete(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const url = `${this.urlApi}/delete/${socialNetwork.id}`;
    return this.http.delete<SocialNetwork>(url, httpOptions);
  }

}
