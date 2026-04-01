import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from '../components/store-list/store-list.component';

export const STORE_ROUTES: Routes = [
  {
    path: '',
    component: StoreListComponent,
  }
];
