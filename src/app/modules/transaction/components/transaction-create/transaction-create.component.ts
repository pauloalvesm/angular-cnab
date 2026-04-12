import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction/transaction.service';
import { StoreService } from '../../../store/services/store/store.service';
import { Store } from '../../../../core/models/interfaces/store.model';
import { Utility } from '../../../../shared/utils/utility';

@Component({
  selector: 'app-transaction-create',
  standalone: false,
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.scss',
})
export class TransactionCreateComponent implements OnInit {
  @Output() transactionCreated = new EventEmitter<void>();
  public transactionForm: FormGroup;
  public isLoading = false;
  isSaving = false;
  public stores: Store[] = [];

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
      error: (err) => console.error('Error loading stores for modal:', err),
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) return;

    this.isLoading = true;
    const formValues = this.transactionForm.value;
    const selectedStore = this.stores.find((s) => s.id === formValues.storeId);

    const payload = {
      type: Number(formValues.type),
      occurrenceDate: formValues.occurrenceDate,
      amount: Number(formValues.amount),
      cpf: formValues.cpf.replace(/\D/g, ''),
      cardNumber: formValues.cardNumber,
      time: new Date().toTimeString().split(' ')[0],
      storeId: formValues.storeId,
      storeName: selectedStore?.name || '',
      storeOwnerName: selectedStore?.ownerName || '',
    };

    this.transactionService.addTransaction(payload).subscribe({
      next: () => {
        this.transactionCreated.emit();
        this.onClear();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Final attempt failed:', err.error);
        this.isLoading = false;
      },
    });
  }

  public onClear(): void {
    this.utility.cleanForm(this.transactionForm);
  }
}
