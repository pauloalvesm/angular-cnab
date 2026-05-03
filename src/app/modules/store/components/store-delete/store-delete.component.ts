import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '../../../../core/models/interfaces/store.model';
import { StoreService } from '../../services/store/store.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

declare var bootstrap: any;

@Component({
  selector: 'app-store-delete',
  standalone: false,
  templateUrl: './store-delete.component.html',
  styleUrl: './store-delete.component.scss',
})
export class StoreDeleteComponent {
  selectedStore: Store | null = null;
  isDeleting = false;

  private alertService = inject(AlertService);

  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Output() storeDeleted = new EventEmitter<void>();

  constructor(private storeService: StoreService) {}

  public setStore(store: Store): void {
    this.selectedStore = store;
  }

  confirmDelete(): void {
    if (!this.selectedStore?.id) return;

    this.isDeleting = true;
    this.storeService.deleteStore(this.selectedStore.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.closeModal();
        this.storeDeleted.emit();
        this.alertService.showAlert('success', 'Store deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting store:', err);
        this.isDeleting = false;
        this.closeModal();

        this.alertService.showAlert(
          'danger',
          'Stores can only be deleted by the administrator user.'
        );
      },
    });
  }

  public closeModal(): void {
    const modalElement = document.getElementById('storeDeleteModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    } else {
      this.closeBtn.nativeElement.click();
    }
  }

}
