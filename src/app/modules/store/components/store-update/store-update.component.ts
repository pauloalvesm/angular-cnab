import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { Utility } from '../../../../shared/utils/utility';

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
          this.storeUpdated.emit();
          this.isSaving = false;
          this.closeBtn.nativeElement.click();
        },
        error: (err) => {
          console.error('Error updating store:', err);
          this.isSaving = false;
        },
      });
  }

  public onClear(): void {
    this.utility.cleanForm(this.storeForm);
  }
}
