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
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'shop'}, 
  {path: '', component: AgentComponent, children: [
    { path: 'shop', component: ShopComponent},
    { path: 'my_kontakt', component: MyContactsComponent},
    { path: 'lead', component:  ContactDetailComponent},
    { path: 'add_kontakt', component: AddContactsComponent},
    { path: 'my_count', component: MyCountComponent}
  ]},
 
];

@NgModule({
  declarations: [AgentComponent, ShopComponent, MyContactsComponent, AddContactsComponent, MyCountComponent, ContactDetailComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class AgentModule { }
