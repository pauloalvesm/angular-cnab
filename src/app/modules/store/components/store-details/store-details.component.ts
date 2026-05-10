import { Component, inject } from '@angular/core';
import { Store } from '../../../../core/models/interfaces/store.model';
import { StoreService } from '../../services/store/store.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-store-details',
  standalone: false,
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.scss',
})
export class StoreDetailsComponent {
  public store?: Store;
  public isLoading = false;

  private alertService = inject(AlertService);

  constructor(private storeService: StoreService) {}

  public setStoreId(id: string): void {
    this.isLoading = true;
    this.storeService.getStoreById(id).subscribe({
      next: (data) => {
        this.store = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching store details:', err);
        this.isLoading = false;

        this.alertService.showAlert(
          'danger',
          'Failed to load store details. Please try again later.'
        );
      },
    });
  }
}
