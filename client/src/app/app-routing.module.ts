import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyComponent } from './components/auth/verify/verify.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginAndSignupGuard } from './guards/login-and-signup.guard';
import { VerifyGuard } from './guards/verify.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginAndSignupGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAndSignupGuard],
  },
  { path: 'verify', component: VerifyComponent, canActivate: [VerifyGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
