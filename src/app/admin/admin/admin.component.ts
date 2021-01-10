import { Component } from '@angular/core';
import { select,Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {
  getUserDataLogin,
  State
} from '../../store'

@Component({
  selector: 'nga-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  readonly loginUser$: Observable<User>;

  constructor( private store: Store<State>) {
    this.loginUser$ = this.store.pipe(select(getUserDataLogin))
   }
}
