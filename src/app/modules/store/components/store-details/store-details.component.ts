import { Component } from '@angular/core';
import { Store } from '../../../../core/models/interfaces/store.model';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-store-details',
  standalone: false,
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.scss',
})
export class StoreDetailsComponent {
  public store?: Store;
  public isLoading = false;

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
      },
    });
  }
}
