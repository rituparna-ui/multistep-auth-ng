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
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('auth guard invoked');
    if (!this.authService.isLoggedIn) {
      console.log('Not logged redirecting');
      console.log('Not logged redirecting');
      this.router.navigate(['login']);
      return false;
    }
    try {
      console.log('logged in parsing token');
      console.log(this.authService.getAuthToken());
      const token = this.authService.getAuthToken();
      const data = JSON.parse(window.atob(token.split('.')[1]));
      if (data.state != 0) {
        this.router.navigate(['verify']);
        return false;
      }
      return true;
    } catch (error) {
      this.authService.postLogout();
      return false;
    }
  }
}
