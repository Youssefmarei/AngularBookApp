import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * A guard that checks if the user is authenticated before allowing access to certain routes.
 * It redirects unauthenticated users to the authentication page.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Checks if the user is authenticated.
   * @param {ActivatedRouteSnapshot} route The activated route snapshot.
   * @param {RouterStateSnapshot} router The router state snapshot.
   * @returns {boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>} True if the user is authenticated, otherwise a URL tree to redirect to the authentication page.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
