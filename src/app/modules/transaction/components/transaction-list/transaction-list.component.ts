import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../../../core/models/interfaces/transaction.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionType } from '../../../../core/models/enums/transaction-type.enum';
import { Utility } from '../../../../shared/utils/utility';
import { TransactionUpdateComponent } from '../transaction-update/transaction-update.component';

@Component({
  selector: 'app-transaction-list',
  standalone: false,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  public isLoading = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public searchTerm: string = '';

  constructor(
    private transactionService: TransactionService,
    public utility: Utility
  ) {}

  @ViewChild(TransactionUpdateComponent) updateModal!: TransactionUpdateComponent;

  ngOnInit(): void {
    this.loadTransactions();
  }

  onClearFilters(): void {
    this.utility.cleanSearchField(this, 'searchTerm');
  }

  get filteredTransactions(): Transaction[] {
    if (!this.searchTerm) {
      return this.transactions;
    }

    const term = this.searchTerm.toLowerCase();
    return this.transactions.filter(t =>
      t.cpf.toLowerCase().includes(term) ||
      t.storeName.toLowerCase().includes(term)
    );
  }

  get paginatedTransactions(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTransactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getTransactionTypeName(type: number): string {
    return TransactionType[type] || 'Unknown';
  }

  loadTransactions(): void {
    this.isLoading = true;

    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data.sort((a, b) => {
        const dateA = new Date(`${a.occurrenceDate}T${a.time}`);
        const dateB = new Date(`${b.occurrenceDate}T${b.time}`);
        return dateB.getTime() - dateA.getTime();
      });

        this.currentPage = 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        this.isLoading = false;
      },
    });
  }

  public prepareEdit(transaction: Transaction): void {
    this.updateModal.setTransaction(transaction);
  }

  onDelete(transaction: Transaction): void {
    console.log('Starting transaction deletion:', transaction.id);
  }
}
