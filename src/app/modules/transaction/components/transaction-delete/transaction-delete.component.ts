import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Transaction } from '../../../../core/models/interfaces/transaction.model';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-delete',
  standalone: false,
  templateUrl: './transaction-delete.component.html',
  styleUrl: './transaction-delete.component.scss',
})
export class TransactionDeleteComponent {
  public selectedTransaction: Transaction | null = null;
  public isDeleting = false;

  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Output() transactionDeleted = new EventEmitter<void>();

  constructor(private transactionService: TransactionService) {}

  public setTransaction(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }

  confirmDelete(): void {
    if (!this.selectedTransaction?.id) return;

    this.isDeleting = true;
    this.transactionService
      .deleteTransaction(this.selectedTransaction.id)
      .subscribe({
        next: () => {
          this.isDeleting = false;
          this.transactionDeleted.emit();
          this.closeBtn.nativeElement.click();
        },
        error: (err) => {
          console.error('Error deleting transaction:', err);
          this.isDeleting = false;
        },
      });
  }
}
