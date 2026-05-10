import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'stores', 
    loadChildren: () => import('./modules/store/store.module').then((m) => m.StoreModule),
    canActivate: [authGuard]
  },
  {
    path: 'cnab',
    loadChildren: () => import('./modules/cnab/cnab.module').then((m) => m.CnabModule),
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    loadChildren: () => import('./modules/transaction/transaction.module').then((m) => m.TransactionModule),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/area/area.module').then((m) => m.AreaModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
