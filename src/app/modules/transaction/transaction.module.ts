import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TRANSACTION_ROUTES } from './routes/transaction.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTION_ROUTES)
  ],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
