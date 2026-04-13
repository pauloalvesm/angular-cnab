import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '../../../../core/models/interfaces/store.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { StoreService } from '../../../store/services/store/store.service';
import { Utility } from '../../../../shared/utils/utility';

@Component({
  selector: 'app-transaction-update',
  standalone: false,
  templateUrl: './transaction-update.component.html',
  styleUrl: './transaction-update.component.scss',
})
export class TransactionUpdateComponent implements OnInit {
  public transactionForm: FormGroup;
  public isLoading = false;
  public isSaving = false;
  public stores: Store[] = [];
  private currentTransactionId: string | null = null;

  @Output() transactionUpdated = new EventEmitter<void>();
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private storeService: StoreService,
    public utility: Utility,
  ) {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      cpf: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      occurrenceDate: ['', Validators.required],
      storeId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getAllStores().subscribe({
      next: (data) => {
        this.stores = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) =>
        console.error('Error loading stores for update modal:', err),
    });
  }

  public setTransaction(transaction: any): void {
    this.currentTransactionId = transaction.id;

    this.transactionForm.patchValue({
      type: transaction.type.toString(),
      amount: transaction.amount,
      cpf: this.utility.formatCpf(transaction.cpf),
      cardNumber: this.utility.formatCard(transaction.cardNumber),
      occurrenceDate: transaction.occurrenceDate.split('T')[0],
      storeId: transaction.storeId,
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid || !this.currentTransactionId) return;

    this.isSaving = true;
    const formValues = this.transactionForm.value;
    const selectedStore = this.stores.find((s) => s.id === formValues.storeId);

    const payload = {
      id: this.currentTransactionId,
      type: Number(formValues.type),
      occurrenceDate: formValues.occurrenceDate,
      amount: Number(formValues.amount),
      cpf: formValues.cpf.replace(/\D/g, ''),
      cardNumber: formValues.cardNumber,
      storeId: formValues.storeId,
      storeName: selectedStore?.name || '',
      storeOwnerName: selectedStore?.ownerName || '',
    };

    this.transactionService
      .updateTransaction(this.currentTransactionId, payload)
      .subscribe({
        next: () => {
          this.transactionUpdated.emit();
          this.isSaving = false;
          this.closeBtn.nativeElement.click();
        },
        error: (err) => {
          console.error('Error updating transaction:', err);
          this.isSaving = false;
        },
      });
  }

  public onClear(): void {
    this.utility.cleanForm(this.transactionForm);
  }
}
