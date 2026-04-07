import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { STORE_ROUTES } from './routes/store.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StoreListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(STORE_ROUTES),
    SharedModule,
    FormsModule
],
  exports: [
    StoreListComponent
  ]
})
export class StoreModule { }
