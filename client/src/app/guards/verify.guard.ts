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
export class VerifyGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    try {
      const token = this.authService.getAuthToken();
      const data = JSON.parse(window.atob(token.split('.')[1]));
      if (data.state != 1 && data.state != 2) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    } catch (error) {
      this.authService.postLogout();
      return false;
    }
  }
}
