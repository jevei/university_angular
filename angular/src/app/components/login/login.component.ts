import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  ngOnInit(): void {}

  logIn() {
    sessionStorage.removeItem('app.token');
    this.authService
      .userLogin(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: (token) => {
          sessionStorage.setItem('app.token', token);

          const decodedToken = jwtDecode<JwtPayload>(token);

          // @ts-ignore
          sessionStorage.setItem('app.roles', decodedToken.scope);

          this.router.navigateByUrl('/');
        },
        error: (error) =>
          this.snackBar.open(`Login failed: ${error.status}`, 'OK'),
      });
    /*.subscribe((success) => {
        if (success) {
          this.router.navigate(['/']);
          console.log('la team de JXR est trop forte');
        } else {
          console.log('ERROR');
          alert('Email ou Mot de Passe invalide.');
        }
      });*/
  }
}
