import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { AuthguradServiceService } from './authgurad-service.service';
import { Observable } from 'rxjs';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(public authguradService: AuthguradServiceService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authguradService.getToken()}`
      }
    });
    return next.handle(request);
  }
}