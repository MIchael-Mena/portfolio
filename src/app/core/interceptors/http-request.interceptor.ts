import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { StorageSessionService } from '../services/storage-session.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageSessionService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isBackendUrl = req.url.includes(environment.backendURL);
    if (!isBackendUrl) return next.handle(req); // imgBB que lanza un error si le paso el token

    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/refresh-token') &&
          !req.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((res) => {
        // Si salio bien ya tengo el access token en cookies
        request = request.clone({
          withCredentials: true,
        });
        return next.handle(request);
      }),
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // Si recibo un error (401), es porque el refresh token ha expirado
          this.authService.logout().subscribe({
            next: (res) => {
              this.storageService.cleanUser();
              this.router.navigate(['/login']).then((_r) => _r);
            },
          });
        }
        return throwError(() => error);
      })
    );
  }
}

export const AuthInterceptorRequest = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
