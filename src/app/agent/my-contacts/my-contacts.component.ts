import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeadOwn } from 'src/app/models/leadOwn.model';
import {FormControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {
  getUserRoleData,
  getUserAreaData,
  State,
  GetLeadsOwn,
  getLeadsOwnLead,
  getUserNickData
} from '../../store'
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'nga-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class MyContactsComponent{

  userRola$: string;
  userArea$: string;
  userNick$: string;
  displayedColumns = ['client', 'type', 'campaign'];
  expandedElement: LeadOwn | null;
  dataSource: MatTableDataSource<LeadOwn>;

  constructor(private store: Store<State>) {
    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);
    this.store.dispatch(new GetLeadsOwn({ leadData: {role: this.userRola$ , type: this.userArea$, agent: this.userNick$} }));

    this.store.pipe(select(getLeadsOwnLead)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    })
   }
 

   // ----------------------------------do sortowania --------------------------------------------
   toppings = new FormControl();
   toppingList: string[] = ['Auto', 'Dom', 'Gospodarstwo', 'Uprawy', 'Nowonabywcy', ' Towary Luksusowe'];
   types = [
    {value: 'Wszystkie'},
    {value: 'Majątek'},
    {value: 'Życie' },
  ];
  selectedValue: string;
//--------------------------------------------------------------------------------------------------

}


