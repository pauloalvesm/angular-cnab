import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { Utility } from '../../../../shared/utils/utility';
import { AlertService } from '../../../../shared/services/alert/alert.service';

declare var bootstrap: any;

@Component({
  selector: 'app-store-update',
  standalone: false,
  templateUrl: './store-update.component.html',
  styleUrl: './store-update.component.scss',
})
export class StoreUpdateComponent {
  storeForm: FormGroup;
  isSaving = false;
  currentStoreId: string | null = null;

  private alertService = inject(AlertService);

  @Output() storeUpdated = new EventEmitter<void>();
  @ViewChild('closeBtn') closeBtn!: ElementRef;

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

  public setStore(store: any): void {
    this.currentStoreId = store.id || store.storeId;
    this.storeForm.patchValue({
      name: store.name,
      ownerName: store.ownerName,
    });
  }

  updateStore(): void {
    if (this.storeForm.invalid || !this.currentStoreId) return;

    this.isSaving = true;

    const storeToUpdate = {
      id: this.currentStoreId,
      ...this.storeForm.value,
    };

    this.storeService
      .updateStore(this.currentStoreId, storeToUpdate)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.closeModal();
          this.storeUpdated.emit();
          this.alertService.showAlert('success', 'Store updated successfully!');
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Error updating store:', err);
          this.alertService.showAlert('danger', 'Failed to update store. Please check the data.');
        },
      });
  }

  public onClear(): void {
    this.utility.cleanForm(this.storeForm);
  }

  public closeModal(): void {
    const modalElement = document.getElementById('storeUpdateModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    } else {
      this.closeBtn.nativeElement.click();
    }
  }

}
