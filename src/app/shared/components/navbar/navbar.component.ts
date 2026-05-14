import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public authService: AuthService) { }

  get userEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
