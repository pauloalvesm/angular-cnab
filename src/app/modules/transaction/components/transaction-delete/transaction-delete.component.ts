import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Transaction } from '../../../../core/models/interfaces/transaction.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

declare var bootstrap: any;

@Component({
  selector: 'app-transaction-delete',
  standalone: false,
  templateUrl: './transaction-delete.component.html',
  styleUrl: './transaction-delete.component.scss',
})
export class TransactionDeleteComponent {
  public selectedTransaction: Transaction | null = null;
  public isDeleting = false;

  private alertService = inject(AlertService);

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
          this.closeModal();
          this.transactionDeleted.emit();
          this.alertService.showAlert('success', 'Transaction deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting transaction:', err);
          this.isDeleting = false;
          this.closeModal();
          this.alertService.showAlert(
            'danger',
            'Transactions can only be deleted by the administrator user.'
          );
        },
      });
  }

  public closeModal(): void {
    const modalElement = document.getElementById('transactionDeleteModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    } else {
      this.closeBtn.nativeElement.click();
    }
  }

}
