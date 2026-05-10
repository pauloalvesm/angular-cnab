import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Utility } from '../../../../shared/utils/utility';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;

  private alertService = inject(AlertService);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private utility: Utility
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.alertService.showAlert('success', 'Login successful! Welcome back.');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('API Error:', err);

          this.alertService.showAlert(
            'danger',
            'Invalid credentials. Please check your email and password.'
          );
        },
      });
    }
  }

  public onClear(): void {
    this.utility.cleanForm(this.loginForm);
  }

  sendEmail(): void {
    const mailto =
      'mailto:admin@localhost?subject=Account%20Request&body=Hi%20Admin,%20I%20would%20like%20to%20request%20access%20to%20the%20CNAB%20system.';
    window.location.href = mailto;
    this.alertService.showAlert('info', 'Opening your email client...');
  }
}

