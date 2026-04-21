import { Component } from '@angular/core';
import { Transaction } from '../../../../core/models/interfaces/transaction.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionType } from '../../../../core/models/enums/transaction-type.enum';

@Component({
  selector: 'app-transaction-details',
  standalone: false,
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent {
  public transaction?: Transaction;
  public isLoading = false;

  constructor(private transactionService: TransactionService) {}

  public getTransactionTypeName(type: number): string {
    return TransactionType[type] || 'Unknown';
  }

  public setTransactionId(id: string): void {
    this.isLoading = true;
    this.transactionService.getTransactionById(id).subscribe({
      next: (data) => {
        this.transaction = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching transaction details:', err);
        this.isLoading = false;
      },
    });
  }
}
