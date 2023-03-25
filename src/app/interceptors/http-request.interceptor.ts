import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageSessionService} from "../service/storage-session.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private sessionStorage: StorageSessionService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const method = request.method;
    if (method === 'POST' || method === 'PUT' || method === 'DELETE'
      || method === 'PATCH' || method === 'OPTIONS') {
      request = request.clone({
        withCredentials: true,
        /*        setHeaders: {
                  'Authorization': `Bearer ${this.sessionStorage.token}`
                }*/
      });
    }
    return next.handle(request);
  }
}

export const httpInterceptorRequest = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
]
