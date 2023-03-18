import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAccessGuard } from './guards/admin-access.guard';
import { LoginAccessGuard } from './guards/login-access.guard';
import { SigninupAccessGuard } from './guards/signinup-access.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
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
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductViewComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginAccessGuard],
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAccessGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
