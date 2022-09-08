import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class TokenInterceptotInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authServie = this.injector.get(ApiService);
    let tokenizeReq = request.clone({
      setHeaders:{
        Authorization:`Berrer ${authServie.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }
}
