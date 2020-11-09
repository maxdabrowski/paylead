import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

import { CategoriesComponent } from './categories/categories.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {CategoriesEffects, ProductsEffects, reducers} from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const routes: Route[] = [
  { path: 'fd', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'wszystkie produkty' },
      { path: ':category', component: CategoriesComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule,
    StoreModule.forFeature('homePage', reducers),
    EffectsModule.forFeature([ CategoriesEffects, ProductsEffects ])

  ],
  declarations: [
    CategoriesComponent,
    ProductGridComponent,
    SearchResultsComponent
  ]
})
export class HomeModule {}
