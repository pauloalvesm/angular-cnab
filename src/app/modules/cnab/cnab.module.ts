import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnabFileComponent } from './components/cnab-file/cnab-file.component';
import { CNAB_ROUTES } from './routes/cnab.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CnabFileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CNAB_ROUTES),
  ],
  exports: [
    CnabFileComponent
  ]
})
export class CnabModule { }
