import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeadOwn } from 'src/app/models/leadOwn.model';

import {
  getUserRoleData,
  getUserAreaData,
  State,
  GetLeadsOwn,
  getLeadsOwnLead,
  getUserNickData
} from '../../store'


@Component({
  selector: 'nga-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.scss']
})
export class MyContactsComponent{

  userRola$: string;
  userArea$: string;
  userNick$: string;
  readonly leadOwn$: Observable<LeadOwn[]>;

  constructor(private store: Store<State>) {
    this.store.pipe(select(getUserRoleData)).subscribe((value) => this.userRola$ = value);
    this.store.pipe(select(getUserAreaData)).subscribe((value) => this.userArea$ = value);
    this.store.pipe(select(getUserNickData)).subscribe((value) => this.userNick$ = value);

    this.store.dispatch(new GetLeadsOwn({ leadData: {role: this.userRola$ , type: this.userArea$, agent: this.userNick$} }));
    this.leadOwn$ = this.store.pipe(select(getLeadsOwnLead))
   }

}
