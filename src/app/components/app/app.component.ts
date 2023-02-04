import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'JXR';
  navbarOpen = false;

  constructor(private authService: AuthService) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAdmin() {
    if (this.authService.currentUser?.is_admin) {
      return true;
    } else return false;
  }
}
