import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { MyCountComponent } from './my-count/my-count.component';
import { StructureComponent } from './structure/structure.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CentralResultsComponent } from './central-results/central-results.component';
import { DetailComponent } from '../shared/components/detail/detail.component';
import { LoginGuard } from '../login.guard';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'contacts'}, 
  {path: '', component: AdminComponent, children: [
    { path: 'contacts', component: ContactsComponent, canActivate: [LoginGuard]},
    { path: 'lead', component: DetailComponent, canActivate: [LoginGuard]},
    { path: 'structure', component: StructureComponent, canActivate: [LoginGuard]},
    { path: 'my_count', component: MyCountComponent, canActivate: [LoginGuard]},
    { path: 'results', component: CentralResultsComponent, canActivate: [LoginGuard]},
 
  ]},
];

@NgModule({
  declarations: [AdminComponent, MyCountComponent, StructureComponent, ContactsComponent, CentralResultsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    NgApexchartsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
