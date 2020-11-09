import { Component, OnInit } from '@angular/core';
import { select,Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

import {
  getUserDataLogin,
  State
} from '../../store'

@Component({
  selector: 'nga-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent{

  readonly loginUser$: Observable<User>;
  
  constructor( private store: Store<State>) {
    this.loginUser$ = this.store.pipe(select(getUserDataLogin))
   }

}
