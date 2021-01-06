import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region/region.component';
import { Route, RouterModule } from '@angular/router';
import { MyCountComponent } from './my-count/my-count.component';
import { RegionResultsComponent } from './region-results/region-results.component';
import { StructureComponent } from './structure/structure.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginGuard } from '../login.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from '../shared/components/components.module';
import { ChangeDataModalComponent } from './structure/change-data-modal/change-data-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChangeAreaModalComponent } from './structure/change-area-modal/change-area-modal.component';
import { ChangeOwnDataModalComponent } from './my-count/change-own-data-modal/change-own-data-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailComponent } from '../shared/components/detail/detail.component';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'contacts'}, 
  {path: '', component: RegionComponent, children: [
    { path: 'contacts', component: ContactsComponent, canActivate: [LoginGuard]},
    { path: 'lead', component: DetailComponent, canActivate: [LoginGuard]},
    { path: 'structure', component: StructureComponent, canActivate: [LoginGuard]},
    { path: 'my_count', component: MyCountComponent, canActivate: [LoginGuard]},
    { path: 'results', component: RegionResultsComponent, canActivate: [LoginGuard]},
 
  ]},
];
@NgModule({
  declarations: [RegionComponent, MyCountComponent, RegionResultsComponent, StructureComponent, ContactsComponent, ChangeDataModalComponent, ChangeAreaModalComponent, ChangeOwnDataModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [RegionComponent]
})
export class RegionModule { }
