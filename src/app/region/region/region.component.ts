import { Component } from '@angular/core';
import { select,Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {
  getUserDataLogin,
  State
} from '../../store'


@Component({
  selector: 'nga-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent{
  readonly loginUser$: Observable<User>;

  constructor( private store: Store<State>) {
    this.loginUser$ = this.store.pipe(select(getUserDataLogin))
   }
}
