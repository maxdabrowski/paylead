import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', component: AdminComponent },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
