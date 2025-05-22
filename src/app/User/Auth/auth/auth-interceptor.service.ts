import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * An interceptor that adds the authentication token to outgoing HTTP requests.
 * It checks if the user is authenticated and appends the token to the request parameters.
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Intercepts outgoing HTTP requests and adds the authentication token if available.
   * @param {HttpRequest<any>} req The outgoing HTTP request.
   * @param {HttpHandler} next The next handler in the chain.
   * @returns An observable of the modified request.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user || !user.token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
