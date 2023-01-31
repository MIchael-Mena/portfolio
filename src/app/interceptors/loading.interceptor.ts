import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoaderService} from "../service/loader.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loadingService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.toggleLoad(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.toggleLoad(false);
        }
      })
    );
  }

}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
]
