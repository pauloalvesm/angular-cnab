import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '../../../../core/models/interfaces/store.model';
import { StoreService } from '../../services/store/store.service';
import { Utility } from '../../../../shared/utils/utility';
import { StoreUpdateComponent } from '../store-update/store-update.component';
import { StoreDeleteComponent } from '../store-delete/store-delete.component';

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

  @ViewChild(StoreUpdateComponent) updateModal!: StoreUpdateComponent;
  @ViewChild(StoreDeleteComponent) deleteModal!: StoreDeleteComponent;

  constructor(
    private storeService: StoreService,
    public utility: Utility
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  onClearFilters(): void {
    this.utility.cleanSearchField(this, 'searchTerm');
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

  public prepareEdit(store: Store): void {
    this.updateModal.setStore(store);
  }

  public prepareDelete(store: Store): void {
    this.deleteModal.setStore(store);
  }
}
