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

  // private urlSocialNetwork= 'http://localhost:5000/SocialNetworks';
  private urlSocialNetwork = 'http://localhost:8080/socialNetworks';

  constructor(private http: HttpClient) {
  }

  get socialNetworks(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(this.urlSocialNetwork);
  }

  get socialNetworksOrder(): Observable<SocialNetwork[]> {
    return this.http.get<SocialNetwork[]>(`${this.urlSocialNetwork}?_sort=position&_order=asc`);
  }

  public updatePosition(id: number, position: number, token: String): Observable<SocialNetwork> {
    // const url = `${this.urlSocialNetwork}/${id}`;
    const url = `${this.urlSocialNetwork}/update/${id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.patch<SocialNetwork>(url, {position: position}, httpOptions);
  }

  public update(socialNetwork: SocialNetwork, token: String): Observable<SocialNetwork> {
    // const url = `${this.urlSocialNetwork}/${socialNetwork.id}`;
    const url = `${this.urlSocialNetwork}/edit/${socialNetwork.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<SocialNetwork>(url, socialNetwork, httpOptions);
  }

  public add(socialNetwork: SocialNetwork, token: String): Observable<SocialNetwork> {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    const url = `${this.urlSocialNetwork}/create`;
    return this.http.post<SocialNetwork>(url, socialNetwork, httpOptions);
    // return this.http.post<SocialNetwork>(this.urlSocialNetwork, socialNetwork, httpOptions);
  }

  public delete(socialNetwork: SocialNetwork, token: String): Observable<SocialNetwork> {
    // const url = `${this.urlSocialNetwork}/${socialNetwork.id}`;
    const url = `${this.urlSocialNetwork}/delete/${socialNetwork.id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete<SocialNetwork>(url, httpOptions);
  }

}
