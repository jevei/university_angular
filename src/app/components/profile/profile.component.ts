import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  currentUser: User;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = new User();
  }
  ngOnInit(): void {
    if (this.authService.currentUser != null) {
      console.log('Current User : ', this.authService.currentUser);
      this.currentUser = this.authService.currentUser;
    } else {
      console.log('Current User : ', this.authService.currentUser);
    }
  }
}
