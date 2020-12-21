import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent/agent.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ShopComponent } from './shop/shop.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { MyCountComponent } from './my-count/my-count.component';
import { ContactDetailComponent } from './my-contacts/contact-detail/contact-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { WalletComponent } from './wallet/wallet.component';
import { ResultsComponent } from './results/results.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './add-contacts/modal/modal.component';
import { RoudChartComponent } from './results/roud-chart/roud-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ColumnChartComponent } from './results/column-chart/column-chart.component';
import { LoginGuard } from '../login.guard';
import { ComponentsModule } from '../shared/components/components.module';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'shop'}, 
  {path: '', component: AgentComponent, children: [
    { path: 'shop', component: ShopComponent, canActivate: [LoginGuard]},
    { path: 'my_kontakt', component: MyContactsComponent, canActivate: [LoginGuard]},
    { path: 'lead', component:  ContactDetailComponent, canActivate: [LoginGuard]},
    { path: 'add_kontakt', component: AddContactsComponent, canActivate: [LoginGuard]},
    { path: 'my_count', component: MyCountComponent, canActivate: [LoginGuard]},
    { path: 'wallet', component: WalletComponent, canActivate: [LoginGuard]},
    { path: 'results', component: ResultsComponent, canActivate: [LoginGuard]}
  ]},
];

@NgModule({
  declarations: [AgentComponent, ShopComponent, MyContactsComponent, AddContactsComponent, MyCountComponent, ContactDetailComponent, WalletComponent, ResultsComponent, ModalComponent, RoudChartComponent, ColumnChartComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  exports: [],
})
export class AgentModule { }
