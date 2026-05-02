import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { Utility } from '../../../../shared/utils/utility';
import { AlertService } from '../../../../shared/services/alert/alert.service';

declare var bootstrap: any;

@Component({
  selector: 'app-store-create',
  standalone: false,
  templateUrl: './store-create.component.html',
  styleUrl: './store-create.component.scss',
})
export class StoreCreateComponent {
  storeForm: FormGroup;
  isSaving = false;

  private alertService = inject(AlertService);

  @Output() storeCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    public utility: Utility,
  ) {
    this.storeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ownerName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  saveStore(): void {
    if (this.storeForm.invalid) return;

    this.isSaving = true;
    this.storeService.addStore(this.storeForm.value).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal();
        this.onClear();
        this.storeCreated.emit();
        this.alertService.showAlert('success', 'Store created successfully!');
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error creating store:', err);
        this.alertService.showAlert('danger', 'Failed to create store. Please check the data.');
      },
    });
  }

  public onClear(): void {
    this.utility.cleanForm(this.storeForm);
  }

  public closeModal(): void {
    const modalElement = document.getElementById('storeCreateModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    }
  }

}
