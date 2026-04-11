import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '../../../../core/models/interfaces/store.model';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-store-delete',
  standalone: false,
  templateUrl: './store-delete.component.html',
  styleUrl: './store-delete.component.scss',
})
export class StoreDeleteComponent {
  selectedStore: Store | null = null;
  isDeleting = false;

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
        this.storeDeleted.emit();
        this.closeBtn.nativeElement.click();
      },
      error: (err) => {
        console.error('Error deleting store:', err);
        this.isDeleting = false;
      },
    });
  }
}
