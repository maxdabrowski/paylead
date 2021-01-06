import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPasswordComponent } from './modal-password/modal-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RoudChartComponent } from './roud-chart/roud-chart.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [ModalPasswordComponent, RoudChartComponent, ColumnChartComponent, DetailComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule,
    MatInputModule,
    NgApexchartsModule,
  ],
  exports:[
    ModalPasswordComponent,
    RoudChartComponent,
    ColumnChartComponent,
    DetailComponent
  ]
})
export class ComponentsModule { }
