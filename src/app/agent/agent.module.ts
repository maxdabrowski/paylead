import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent/agent.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ShopComponent } from './shop/shop.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { MyCountComponent } from './my-count/my-count.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { WalletComponent } from './wallet/wallet.component';
import { ResultsComponent } from './results/results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'shop'}, 
  {path: '', component: AgentComponent, children: [
    { path: 'shop', component: ShopComponent},
    { path: 'my_kontakt', component: MyContactsComponent},
    { path: 'lead', component:  ContactDetailComponent},
    { path: 'add_kontakt', component: AddContactsComponent},
    { path: 'my_count', component: MyCountComponent},
    { path: 'wallet', component: WalletComponent},
    { path: 'results', component: ResultsComponent}
  ]},
 
];

@NgModule({
  declarations: [AgentComponent, ShopComponent, MyContactsComponent, AddContactsComponent, MyCountComponent, ContactDetailComponent, WalletComponent, ResultsComponent],
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
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class AgentModule { }
