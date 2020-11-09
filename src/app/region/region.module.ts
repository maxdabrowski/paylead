import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region/region.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', component: RegionComponent },
];

@NgModule({
  declarations: [RegionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RegionComponent]
})
export class RegionModule { }
