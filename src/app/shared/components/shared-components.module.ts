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
import { MatButtonModule } from '@angular/material/button';
import { DeactivationModalComponent } from './deactivation-modal/deactivation-modal.component';
import { ChangeUserDataModalComponent } from './change-user-data-modal/change-user-data-modal.component';
import { ChangeUserModalComponent } from './change-user-modal/change-user-modal.component';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ModalPasswordComponent, RoudChartComponent, ColumnChartComponent, DetailComponent,  DeactivationModalComponent, ChangeUserDataModalComponent, ChangeUserModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule,
    MatInputModule,
    NgApexchartsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  exports:[
    ModalPasswordComponent,
    RoudChartComponent,
    ColumnChartComponent,
    DetailComponent,
    DeactivationModalComponent,
    ChangeUserDataModalComponent,
    ChangeUserModalComponent
  ]
})
export class SharedComponentsModule { }