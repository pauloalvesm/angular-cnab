import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../core/models/interfaces/transaction.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionType } from '../../../../core/models/enums/transaction-type.enum';

@Component({
  selector: 'app-transaction-list',
  standalone: false,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  public isLoading = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  getTransactionTypeName(type: number): string {
    return TransactionType[type] || 'Unknown';
  }

  loadTransactions(): void {
    this.isLoading = true;

    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        this.isLoading = false;
      },
    });
  }

  onEdit(transaction: Transaction): void {
    console.log('Starting transaction edit:', transaction.id);
  }

  onDelete(transaction: Transaction): void {
    console.log('Starting transaction deletion:', transaction.id);
  }
}
