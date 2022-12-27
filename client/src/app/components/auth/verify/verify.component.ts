import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  data: {
    id: string;
    state: number;
    iat: number;
  } = { iat: 0, state: 3, id: '' };
  ngOnInit(): void {
    this.authService.getAuthTokenNotifier().subscribe((token) => {
      const data = JSON.parse(window.atob((token + '').split('.')[1]));
      this.data = data;
      if (this.data.state != 1 && this.data.state != 2) {
        this.router.navigate(['']);
      }
      return;
    });

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
    }
    try {
      const data = JSON.parse(window.atob((token + '').split('.')[1]));
      this.data = data;
      if (this.data.state != 1 && this.data.state != 2) {
        this.router.navigate(['']);
      }
    } catch (error) {
      this.router.navigate(['login']);
    }
  }
}
