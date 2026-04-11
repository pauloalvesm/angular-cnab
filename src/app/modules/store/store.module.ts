import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { STORE_ROUTES } from './routes/store.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { StoreUpdateComponent } from './components/store-update/store-update.component';
import { StoreDeleteComponent } from './components/store-delete/store-delete.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';

@NgModule({
  declarations: [
    StoreListComponent,
    StoreCreateComponent,
    StoreUpdateComponent,
    StoreDeleteComponent,
    StoreDetailsComponent
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
    StoreCreateComponent,
    StoreUpdateComponent,
    StoreDeleteComponent,
    StoreDetailsComponent
  ]
})
export class StoreModule { }
