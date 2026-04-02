import { TransactionType } from '../enums/transaction-type.enum';
import { Store } from './store.model';

export interface Transaction {
  id: string;
  type: TransactionType;
  occurrenceDate: string;
  amount: number;
  cpf: string;
  cardNumber: string;
  time: string;
  storeId: string;
  storeName: string;
  storeOwnerName: string;
}
