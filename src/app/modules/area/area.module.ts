import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AREA_ROUTES } from './routes/area.routing';
import { RouterModule } from '@angular/router';
import { TransactionChartComponent } from './components/charts/transaction-chart/transaction-chart.component';
import { StoreDistributionChartComponent } from './components/charts/store-distribution-chart/store-distribution-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TransactionChartComponent,
    StoreDistributionChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AREA_ROUTES)
  ],
  exports: [
    DashboardComponent,
    TransactionChartComponent,
    StoreDistributionChartComponent
  ]
})
export class AreaModule { }
