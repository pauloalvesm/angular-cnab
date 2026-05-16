import { Component, inject } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private alertService = inject(AlertService);

  constructor(public authService: AuthService) { }

  get userEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onLogout(): void {
    this.alertService.showAlert('success', 'Logged out successfully. See you soon!');
    this.authService.logout();
  }

}
