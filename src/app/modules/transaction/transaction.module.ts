import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TRANSACTION_ROUTES } from './routes/transaction.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionUpdateComponent } from './components/transaction-update/transaction-update.component';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionCreateComponent,
    TransactionUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTION_ROUTES),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
],
  exports: [
    TransactionListComponent,
    TransactionCreateComponent,
    TransactionUpdateComponent
  ]
})
export class TransactionModule { }
