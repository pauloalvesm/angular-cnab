import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { STORE_ROUTES } from './routes/store.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreCreateComponent } from './components/store-create/store-create.component';

@NgModule({
  declarations: [
    StoreListComponent,
    StoreCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(STORE_ROUTES),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
],
  exports: [
    StoreListComponent,
    StoreCreateComponent
  ]
})
export class StoreModule { }
