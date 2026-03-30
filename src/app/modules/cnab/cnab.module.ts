import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnabFileComponent } from './components/cnab-file/cnab-file.component';

@NgModule({
  declarations: [
    CnabFileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CnabFileComponent
  ]
})
export class CnabModule { }
