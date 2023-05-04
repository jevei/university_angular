import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(
      sessionStorage.getItem('app.roles'),
      this.authService.isLoggedIn
    );
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      // sinon, on peut fournir un URLTree pour rediriger l'utilisateur
      return this.router.parseUrl('/products');
    }
  }
}
