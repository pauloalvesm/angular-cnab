import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { STORE_ROUTES } from './routes/store.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StoreListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(STORE_ROUTES)
  ],
  exports: [
    StoreListComponent
  ]
})
export class StoreModule { }
