import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signForm = new FormGroup(
      {
        firstname: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ]),
        lastname: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        phone_number: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]+$'),
        ]),
      },
      this.passwordMatch
    );
  }
  ngOnInit(): void {}

  private passwordMatch(form: AbstractControl): ValidationErrors | null {
    if (form.value?.password != form.value?.passwordConfirmation) {
      return { passwordConfirmationMustMatch: true };
    } else {
      return null;
    }
  }

  signUp() {
    console.log(JSON.stringify(this.signForm.getRawValue()));
    let newUser: User = new User();
    newUser.email = this.signForm.get('email')?.value;
    newUser.password = this.signForm.get('password')?.value;
    newUser.firstname = this.signForm.get('firstname')?.value;
    newUser.lastname = this.signForm.get('lastname')?.value;
    newUser.phone_number = this.signForm.get('phone_number')?.value;
    console.log('SignUpform value : ', this.signForm.value);
    console.log('New user value ', newUser);
    this.authService.userRegistration(newUser).subscribe((success) => {
      if (success) {
        this.router.navigate(['/']);
        console.log('OK');
      } else {
        console.log('ERROR');
        alert("Erreur dans le formulaire d'inscription");
      }
    });
  }
}
