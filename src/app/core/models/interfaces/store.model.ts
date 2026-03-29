import { Transaction } from './transaction.model';

export interface Store {
  id: string;
  name: string;
  ownerName: string;
  transactions: Transaction[];
}
