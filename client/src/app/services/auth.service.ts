import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  private authToken = '';
  private authTokenNotifier = new Subject<string>();
  constructor(private http: HttpClient, private router: Router) {}
  getAuthToken() {
    return this.authToken;
  }
  getAuthTokenNotifier() {
    return this.authTokenNotifier.asObservable();
  }

  postLogin(token: string) {
    this.isLoggedIn = true;
    this.authToken = token;
    this.authTokenNotifier.next(token);
    localStorage.setItem('token', token);
  }

  postLogout() {
    this.isLoggedIn = false;
    this.authToken = '';
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  verifyToken(token: string) {
    return this.http.post<{ message: string; valid: boolean }>(
      'http://localhost:3000/verify-token',
      {
        token,
      }
    );
  }

  verifyEmail(otp: number) {
    this.http
      .post<{ message: string; token: string }>(
        'http://localhost:3000/verify-email',
        { otp },
        {
          headers: {
            Authorization: this.authToken,
          },
        }
      )
      .subscribe((data) => {
        this.postLogin(data.token);
      });
  }

  completeProfile(sex: string) {
    this.http
      .post<{ message: string; token: string }>(
        'http://localhost:3000/complete-profile',
        {
          sex,
        },
        {
          headers: {
            Authorization: this.authToken,
          },
        }
      )
      .subscribe((data) => {
        console.log(data);

        this.postLogin(data.token);
        return this.router.navigate(['']);
      });
  }

  autoLogin() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    } else {
      this.postLogin(token);
      this.verifyToken(token).subscribe((data) => {
        if (!data.valid) {
          return this.postLogout();
        }
        this.postLogin(token);
      });
    }
  }

  signup(email: string, password: string) {
    this.http
      .post<{ message: string; token: string }>(
        'http://localhost:3000/signup',
        {
          email,
          password,
        }
      )
      .subscribe((data) => {
        this.postLogin(data.token);
        this.router.navigate(['verify']);
      });
  }
}
