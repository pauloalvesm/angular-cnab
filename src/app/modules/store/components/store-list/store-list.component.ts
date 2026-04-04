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
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public searchTerm: string = '';

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  get filteredStores(): Store[] {
    if (!this.searchTerm) {
      return this.stores;
    }

    const term = this.searchTerm.toLowerCase();
    return this.stores.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.ownerName.toLowerCase().includes(term)
    );
  }

  get paginatedStores(): Store[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStores.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  loadStores(): void {
    this.isLoading = true;

    this.storeService.getAllStores().subscribe({
      next: (data) => {
        this.stores = data.sort((a, b) => a.name.localeCompare(b.name));
        this.currentPage = 1;
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
