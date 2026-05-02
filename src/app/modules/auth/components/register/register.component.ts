import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Utility } from '../../../../shared/utils/utility';

declare var bootstrap: any;

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.closeModal();
          this.registerForm.reset();
          alert('User registered successfully!');
        },
        error: (err) => console.error('Registration Error:', err),
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
