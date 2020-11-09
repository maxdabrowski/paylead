import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent/agent.component';
import { Route, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ShopComponent } from './shop/shop.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { MyCountComponent } from './my-count/my-count.component';
import { reducers,CategoriesEffects2, ProductsEffects2 } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'shop'}, 
  {path: '', component: AgentComponent, children: [
    { path: 'shop', component: ShopComponent},
    { path: 'my_kontakt', component: MyContactsComponent},
    { path: 'add_kontakt', component: AddContactsComponent},
    { path: 'my_count', component: MyCountComponent}
  ]},
 
];

@NgModule({
  declarations: [AgentComponent, ShopComponent, MyContactsComponent, AddContactsComponent, MyCountComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('agent', reducers),
    EffectsModule.forFeature([ CategoriesEffects2, ProductsEffects2 ])

  ],
})
export class AgentModule { }
