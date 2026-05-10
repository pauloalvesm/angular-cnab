import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Utility } from '../../../../shared/utils/utility';
import { AlertService } from '../../../../shared/services/alert/alert.service';

declare var bootstrap: any;

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  private alertService = inject(AlertService);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utility: Utility
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.alertService.showAlert('danger', 'Passwords do not match.');
        return;
      }

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.closeModal();
          this.registerForm.reset();
          this.alertService.showAlert('success', 'User registered successfully!');
        },
        error: (err) => {
          console.error('Registration Error:', err);

          this.alertService.showAlert(
            'danger',
            'Failed to register. This email might already be in use.'
          );
        },
      });
    }
  }

  public closeModal(): void {
    const modalElement = document.getElementById('registerModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();

      this.registerForm.reset();
    }
  }

  public onClear(): void {
    this.utility.cleanForm(this.registerForm);
  }
}
