import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AREA_ROUTES } from './routes/area.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AREA_ROUTES)
  ],
  exports: [
    DashboardComponent
  ]
})
export class AreaModule { }
