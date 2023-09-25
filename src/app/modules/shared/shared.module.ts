import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    MaterialModule,
    HighchartsChartModule
  ]
})
export class SharedModule { }
