import { Component } from '@angular/core';
import { select,Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {
  getUserDataLogin,
  State
} from '../../store'


@Component({
  selector: 'nga-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent  {
  readonly loginUser$: Observable<User>;
  
  constructor( private store: Store<State>) {
    this.loginUser$ = this.store.pipe(select(getUserDataLogin))
   }

}
