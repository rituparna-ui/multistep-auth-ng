import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css'],
})
export class CompleteProfileComponent {
  constructor(private authService: AuthService) {}
  sex = '';
  onSex() {
    this.authService.completeProfile(this.sex);
  }
}
