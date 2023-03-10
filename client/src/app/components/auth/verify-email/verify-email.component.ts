import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  constructor(private authService: AuthService) {}
  otp: number = 0;
  onOtp() {
    this.authService.verifyEmail(this.otp);
  }
}
