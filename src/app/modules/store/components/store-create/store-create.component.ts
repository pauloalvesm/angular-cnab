import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { Utility } from '../../../../shared/utils/utility';

@Component({
  selector: 'app-store-create',
  standalone: false,
  templateUrl: './store-create.component.html',
  styleUrl: './store-create.component.scss',
})
export class StoreCreateComponent {
  storeForm: FormGroup;
  isSaving = false;

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
        this.onClear();
        this.storeCreated.emit();
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error creating store:', err);
        this.isSaving = false;
      },
    });
  }

  public onClear(): void {
    this.utility.cleanForm(this.storeForm);
  }
}
