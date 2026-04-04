import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TRANSACTION_ROUTES } from './routes/transaction.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTION_ROUTES),
    SharedModule,
    FormsModule
],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
