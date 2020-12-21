import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { Route, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { StructureComponent } from './structure/structure.component';
import { AreaResultsComponent } from './area-results/area-results.component';
import { MyCountComponent } from './my-count/my-count.component';
import { LoginGuard } from '../login.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from '../shared/components/components.module';


const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'contacts'}, 
  {path: '', component: AreaComponent, children: [
    { path: 'contacts', component: ContactsComponent, canActivate: [LoginGuard]},
    { path: 'structure', component: StructureComponent, canActivate: [LoginGuard]},
    { path: 'my_count', component: MyCountComponent, canActivate: [LoginGuard]},
    { path: 'results', component: AreaResultsComponent, canActivate: [LoginGuard]}
  ]},
];

@NgModule({
  declarations: [AreaComponent, ContactsComponent, StructureComponent, AreaResultsComponent, MyCountComponent],
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
    MatInputModule,
    MatDialogModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  exports: [AreaComponent]
})
export class AreaModule { }
