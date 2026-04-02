import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../core/models/interfaces/store.model';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-store-list',
  standalone: false,
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss',
})
export class StoreListComponent implements OnInit {
  public stores: Store[] = [];
  public isLoading = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.isLoading = true;

    this.storeService.getAllStores().subscribe({
      next: (data) => {
        this.stores = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching CNAB records:', err);
        this.isLoading = false;
      },
    });
  }

  onEdit(store: Store): void {
    console.log('Starting store edit:', store.name);
  }

  onDelete(store: Store): void {
    console.log('Starting store deletion:', store.name);
  }
}
