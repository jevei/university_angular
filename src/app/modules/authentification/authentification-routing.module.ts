import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { AdminAccessGuard } from 'src/app/guards/admin-access.guard';
import { LoginAccessGuard } from 'src/app/guards/login-access.guard';
import { SigninupAccessGuard } from 'src/app/guards/signinup-access.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SigninupAccessGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SigninupAccessGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginAccessGuard],
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAccessGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthentificationRoutingModule {}
