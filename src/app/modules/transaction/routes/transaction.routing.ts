import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from '../components/transaction-list/transaction-list.component';

export const TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    component: TransactionListComponent,
  }
];
