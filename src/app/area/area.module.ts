import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', component: AreaComponent },
];

@NgModule({
  declarations: [AreaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [AreaComponent]
})
export class AreaModule { }
