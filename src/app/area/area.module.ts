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

import { MatIconModule } from '@angular/material/icon';
import { AddAgentComponent } from './structure/add-agent/add-agent.component';
import { ChangeDataModalComponent } from './structure/change-data-modal/change-data-modal.component';
import { DeactivationModalComponent } from './structure/deactivation-modal/deactivation-modal.component';
import { DetailComponent } from '../shared/components/detail/detail.component';


const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'contacts'}, 
  {path: '', component: AreaComponent, children: [
    { path: 'contacts', component: ContactsComponent, canActivate: [LoginGuard]},
    { path: 'lead', component: DetailComponent, canActivate: [LoginGuard]},
    { path: 'structure', component: StructureComponent, canActivate: [LoginGuard]},
    { path: 'add_agent', component: AddAgentComponent, canActivate: [LoginGuard]},
    { path: 'my_count', component: MyCountComponent, canActivate: [LoginGuard]},
    { path: 'results', component: AreaResultsComponent, canActivate: [LoginGuard]}
  ]},
];

@NgModule({
  declarations: [AreaComponent, ContactsComponent, StructureComponent, AreaResultsComponent, MyCountComponent, AddAgentComponent, ChangeDataModalComponent, DeactivationModalComponent],
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
    MatDialogModule,
    NgApexchartsModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  exports: [AreaComponent]
})
export class AreaModule { }
