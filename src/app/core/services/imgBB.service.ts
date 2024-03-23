import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ImgBB } from '../models/ImgBB';

@Injectable({
  providedIn: 'root',
})
export class ImgBBService {
  private imageBBURL = environment.imgBBurl;

  constructor(private readonly http: HttpClient) {}

  upload(file: File, apiKey: string): Observable<ImgBB> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http
      .post(this.imageBBURL + '/upload', formData, { params: { key: apiKey } })
      .pipe(map((response: any) => response['data']));
    // map transforma la respuesta del servidor para devolver solo la data
  }
}
