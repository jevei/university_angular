import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'JXR';
  navbarOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAdmin() {
    if (this.authService.currentUser?.is_admin) {
      return true;
    } else return false;
  }

  logOut() {
    this.authService.userSignout().subscribe((success) => {
      if (success) {
        console.log('Utilisateur déconnecter');
        this.router.navigate(['/']);
      } else {
        console.log('Erreur', success);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
