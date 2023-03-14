import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SocialNetwork} from "../social-network/SocialNetwork";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
  })
}

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {

  private apiUrlSocialNetworks = 'http://localhost:5000/SocialNetworks';

  constructor(private http: HttpClient) {
  }

  get socialNetworks(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(this.apiUrlSocialNetworks);
  }

  get socialNetworksOrder(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(`${this.apiUrlSocialNetworks}?_sort=position&_order=asc`);
  }

  public updatePosition(id: number, position: number, token: String): Observable<SocialNetwork> {
    const url = `${this.apiUrlSocialNetworks}/${id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.patch<SocialNetwork>(url, {position: position}, httpOptions);
  }

  public update(socialNetwork: SocialNetwork, token: String): Observable<SocialNetwork> {
    const url = `${this.apiUrlSocialNetworks}/${socialNetwork.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<SocialNetwork>(url, socialNetwork, httpOptions);
  }

  public add(socialNetwork: SocialNetwork, token: String): Observable<SocialNetwork> {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<SocialNetwork>(this.apiUrlSocialNetworks, socialNetwork, httpOptions);
  }

  public delete(socialNetwork: SocialNetwork, token: String): Observable<SocialNetwork> {
    const url = `${this.apiUrlSocialNetworks}/${socialNetwork.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete<SocialNetwork>(url, httpOptions);
  }

}
